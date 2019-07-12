using System.Web;
using System.Text;
using System.IO;
using System.Net;
using System;
using System.Collections.Generic;

namespace Com.Alipay
{
    /// <summary>
    /// 类名：Notify
    /// 功能：支付宝通知处理类
    /// 详细：处理支付宝各接口通知返回
    /// 版本：3.3
    /// 修改日期：2011-07-05
    /// '说明：
    /// 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
    /// 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
    /// class name:AlipayNotify
    /// Function:The class Alipay use to handle notification
    /// Detail:Handle the notification of Alipay interfaces
    /// version:3.3
    /// modify date:2012-08-17
    /// instructions:
    /// This code below is a sample demo for merchants to do test.Merchants can refer to the integration documents and write your own code to fit your website.Not necessarily to use this code.  
    /// Alipay provide this code for you to study and research on Alipay interface, just for your reference.
    /// //////////////////////注意note/////////////////////////////
    /// 调试通知返回时，可查看或改写log日志的写入TXT里的数据，来检查通知返回是否正常 
	/// When debugging notification feedback，you can check or modify the text included into log to see whether the feedback is normal 
    /// </summary>
    public class Notify
    {
        #region 字段
        private string _partner = "";               //合作身份者ID
        private string alipay_public_key = "";            //支付宝的公钥
        private string _input_charset = "";         //编码格式
        private string _sign_type = "";             //签名方式

        //支付宝消息验证地址
	    //The URL of verification of Alipay notification.
		//沙箱网关异步消息验证地址
	    //The verification URL of Alipay notification,sandbox environment.
        private string Https_veryfy_url = "https://openapi.alipaydev.com/gateway.do?service=notify_verify&";
		//线上网关异步消息验证地址，如商户使用的生产环境，请换成下面的生产环境的地址
	    //The verification URL of Alipay notification,production environment.(pls use the below line instead if you were in production environment)	
		//private string Https_veryfy_url = "https://mapi.alipay.com/gateway.do?service=notify_verify&";
        #endregion


        /// <summary>
        /// 构造函数 constructor
        /// 从配置文件中初始化变量Initialize variables from configuration
        /// </summary>
        /// <param name="inputPara">通知返回参数数组The params sent back from notification</param>
        /// <param name="notify_id">通知验证ID the id of notification</param>
        public Notify()
        {
            //初始化基础配置信息
			//Initialize the basic configuration information
            _partner = Config.partner.Trim();
            alipay_public_key = getPublicKeyStr(Config.alipay_public_key.Trim());
            _input_charset = Config.input_charset.Trim().ToLower();
            _sign_type = Config.sign_type.Trim().ToUpper();
        }
		
		 /// <summary>
        /// 从文件读取公钥转公钥字符串
		///Get public key from file and transform to a string
        /// </summary>
        /// <param name="Path">公钥文件路径the path of public key</param>
        public static string getPublicKeyStr(string Path)
        {
            StreamReader sr = new StreamReader(Path);
            string pubkey = sr.ReadToEnd();
            sr.Close();
            if (pubkey != null)
            {
                pubkey = pubkey.Replace("-----BEGIN PUBLIC KEY-----", "");
                pubkey = pubkey.Replace("-----END PUBLIC KEY-----", "");
                pubkey = pubkey.Replace("\r", "");
                pubkey = pubkey.Replace("\n", "");
            }
            return pubkey;
        }

		public bool VerifyReturn(SortedDictionary<string, string> inputPara, string sign)
        {
            //获取返回时的签名验证结果
			//get the verification result of the return
            bool isSign = GetSignVeryfy(inputPara, sign);
            return isSign;
        }
		
        /// <summary>
        ///  验证消息是否是支付宝发出的合法消息
		///  Verify whether it's a legal notification sent from Alipay
        /// </summary>
        /// <param name="inputPara">通知返回参数数组The response from notification</param>
        /// <param name="notify_id">通知验证ID notify_id</param>
        /// <param name="sign">支付宝生成的签名结果 the sign generated from Alipay</param>
        /// <returns>验证结果verification result</returns>
        public bool Verify(SortedDictionary<string, string> inputPara, string notify_id, string sign)
        {
            //获取返回时的签名验证结果
			//get the result of verification
            bool isSign = GetSignVeryfy(inputPara, sign);
            //获取是否是支付宝服务器发来的请求的验证结果
			//check whether the notification is from Alipay
            string responseTxt = "false";
            if (notify_id != null && notify_id != "") { responseTxt = GetResponseTxt(notify_id); }

            //写日志记录（若要调试，请取消下面两行注释）
		    //write the log(pls uncomment the below two lines if you would like to debug)
            //string sWord = "responseTxt=" + responseTxt + "\n isSign=" + isSign.ToString() + "\n 返回回来的参数：" + GetPreSignStr(inputPara) + "\n ";
            //Core.LogResult(sWord);

            //判断responsetTxt是否为true，isSign是否为true
            //responsetTxt的结果不是true，与服务器设置问题、合作身份者ID、notify_id一分钟失效有关
            //isSign不是true，与安全校验码、请求时的参数格式（如：带自定义参数等）、编码格式有关
			//judgue whether responsetTxt and isSign is true
            //if responsetTxt is not true,the cause might be related to sever setting,merchant account and expiration time of notify_id(one minute).
            //if isSign is not true，the cause might be related to sign,charset and format of request str(eg:request with custom parameter etc.) 
            if (responseTxt == "true" && isSign)//验证成功verification succeed
            {
                return true;
            }
            else//验证失败verification failed
            {
                return false;
            }
        }

        /// <summary>
        /// 获取待签名字符串（调试用）
		///get the pre-sign string (for debug)
        /// </summary>
        /// <param name="inputPara">通知返回参数数组params from notification</param>
        /// <returns>待签名字符串pre-sign string</returns>
        private string GetPreSignStr(SortedDictionary<string, string> inputPara)
        {
            Dictionary<string, string> sPara = new Dictionary<string, string>();

            //过滤空值、sign与sign_type参数
			//filter the blank,sign and sign_type
            sPara = Core.FilterPara(inputPara);

            //获取待签名字符串 get the pre-sign string
            string preSignStr = Core.CreateLinkString(sPara);

            return preSignStr;
        }

        /// <summary>
        /// 获取返回时的签名验证结果
		/// get the result of verification of returned notification
        /// </summary>
        /// <param name="inputPara">通知返回参数数组the params from the feedback notification</param>
        /// <param name="sign">对比的签名结果the sign to be compared</param>
        /// <returns>签名验证结果the result of verification</returns>
        private bool GetSignVeryfy(SortedDictionary<string, string> inputPara, string sign)
        {
            Dictionary<string, string> sPara = new Dictionary<string, string>();

            //过滤空值、sign与sign_type参数
		//Filter parameters with null value ,sign and sign_type
            sPara = Core.FilterPara(inputPara);
            
            //获取待签名字符串
		//Generate the pre-sign string
            string preSignStr = Core.CreateLinkString(sPara);

            //获得签名验证结果
		//get the result of verification
            bool isSgin = false;
            if (sign != null && sign != "")
            {
                switch (_sign_type)
                {
                    case "RSA":
                        isSgin = RSAFromPkcs8.verify(preSignStr, sign, alipay_public_key, _input_charset);
                        break;
                    default:
                        break;
                }
            }

            return isSgin;
        }

        /// <summary>
        /// 获取是否是支付宝服务器发来的请求的验证结果
		/// check whether the notification is sent from Alipay sever
        /// </summary>
        /// <param name="notify_id">通知验证ID</param>
        /// <returns>验证结果the result of notification</returns>
        private string GetResponseTxt(string notify_id)
        {
            string veryfy_url = Https_veryfy_url + "partner=" + _partner + "&notify_id=" + notify_id;

            //获取远程服务器ATN结果，验证是否是支付宝服务器发来的请求
		//Get the remote server ATN result,verify whether it's from Alipay
            string responseTxt = Get_Http(veryfy_url, 120000);

            return responseTxt;
        }

        /// <summary>
        /// 获取远程服务器ATN结果
		/// Get the remote server ATN result
        /// </summary>
        /// <param name="strUrl">指定URL路径地址specified URL value</param>
        /// <param name="timeout">超时时间设置timeout</param>
        /// <returns>服务器ATN结果Sever ATN result</returns>
        private string Get_Http(string strUrl, int timeout)
        {
            string strResult;
            try
            {
                HttpWebRequest myReq = (HttpWebRequest)HttpWebRequest.Create(strUrl);
                myReq.Timeout = timeout;
                HttpWebResponse HttpWResp = (HttpWebResponse)myReq.GetResponse();
                Stream myStream = HttpWResp.GetResponseStream();
                StreamReader sr = new StreamReader(myStream, Encoding.Default);
                StringBuilder strBuilder = new StringBuilder();
                while (-1 != sr.Peek())
                {
                    strBuilder.Append(sr.ReadLine());
                }

                strResult = strBuilder.ToString();
            }
            catch (Exception exp)
            {
                strResult = "错误error：" + exp.Message;
            }

            return strResult;
        }
    }
}