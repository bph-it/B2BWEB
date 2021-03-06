﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="payment.aspx.cs" Inherits="NewWorld_views_payment_payment" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8">
    <meta http-equiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
    <meta http-equiv='Pragma' content='no-cache' />
    <meta http-equiv='Expires' content='0' />
    <title>支付页面</title>
    <!-- 初始化样式 -->
    <link rel="stylesheet" href="../../assets/css/Custom/base.css">
    <!-- 公共样式 -->
    <link rel="stylesheet" href="../../assets/css/Custom/reset.css">
    <!-- H-ui 插件 -->
    <link rel="stylesheet" href="../../assets/css/library/H-ui.css">
    <!-- 图标字体库 -->
    <link rel="stylesheet" href="../../assets/font/font-al.css">
    <!-- 自定义样式 -->
    <link rel="stylesheet" href="./payment.css">
</head>
<body>
    <script src="../../public/hade/hade.js"></script>
    <form id="form1" runat="server">
        <div id="payment" class="container">
            <!-- 跳转支付 -->
            <div class="z-screen">
                <div class="z-mod-alipay-level-warning">
                    <div class="z-content">
                        根据监管部门要求，在完善身份信息后您的支付宝账户余额才能付款，麻烦您尽快
                    </div>
                </div>

                <div class="z-layout-line">
                    <div class="z-mod-order">
                        <ul class="z-unit-goods cl">
                            <li class="order-no f-l">
                                <div class="z-order-no">
                                    <span class="p-ding">订单号 &nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;</span>
                                    <span class="tid"></span>
                                </div>
                                <div class="z-order-no-2">
                                    <span class="duoyu">商品信息 ：</span>
                                    <span class="duoyu11"></span>
                                </div>
                            </li>
                            <li class="goods-subdesc f-l">
                                <div>
                                    <h1 class="text-large text-stress">174.40</h1>
                                    <span>元</span>
                                </div>
                                <div>
                                    请在
                                <span class="text-stress">4</span>
                                    天
                                <span class="text-stress">23</span>
                                    时
                                <span class="text-stress">58</span>
                                    分内完成支付
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="z-layout-line">
                    <ul class="mod-payment cl">

                        <li class="unit-pay-card f-l">
                            <div class="pay-container relative">
                                <div class="summary">
                                    <img src="../../assets/image/bjimg/zfb.jpg" class=""></img>
                                    <span class="channel-name">支付宝</span>
                                    <span class="channel-name-2">支付宝 支付托</span>
                                    <img src="../../assets/image/bjimg/zh.jpg" class="channel-name-3 channel-name-b" alt="">
                                </div>
                            </div>
                        </li>

                        <li class="unit-pay-card f-l">
                            <div class="pay-container relative">
                                <div class="summary">
                                    <img src="../../assets/image/bjimg/yhzz.jpg"></img>
                                    <span class="channel-name">银行转账</span>
                                    <span class="channel-name-2">收款人: 某某某</span>
                                    <img src="../../assets/image/bjimg/zh.jpg" class="channel-name-3 channel-name-b" alt="">
                                </div>
                            </div>
                        </li>

                        <li class="unit-pay-card f-l">
                            <div class="pay-container relative">
                                <div class="summary">
                                    <img src="../../assets/image/bjimg/yhzz.jpg"></img>
                                    <span class="channel-name">对公转账</span>
                                    <span class="channel-name-2">收款人: 上海市百品汇有限公司</span>
                                    <img src="../../assets/image/bjimg/zh.jpg" class="channel-name-3 channel-name-b" alt="">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="l-layout">
                    <asp:Button ID="btnpay" runat="server" Text="去付款" CssClass="l-button-larger" OnClick="btnpay_Click"/>
                </div>
            </div>
        </div>
    </form>
    <script src="../../assets/js/jquery.js" defer></script>
    <!-- cookie -->
    <script src="../../assets/js/cookie.js" defer></script>
    <!-- 自定义 js -->
    <script src="./payment.js" defer></script>
</body>
</html>
