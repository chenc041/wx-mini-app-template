Component({
    properties: {
        title: {
            type: String,
            value: "",
        },
        theme: {
            type: String,
            value: "light", // light / dark
        },
        zIndex: {
            type: Number,
            value: 100,
        },
        // 导航栏标题颜色
        textStyle: {
            type: String,
            value: "",
        },
        // 导航栏背景色
        barBg: {
            type: String,
            value: "transparent",
        },
        fixed: {
            type: Boolean,
            value: true,
        },
        // 导航栏
        barStyle: {
            type: String,
            value: "",
        },
        // 导航下滑露出背景色
        backgroundColor: {
            type: String,
            value: "",
        },
        isCustom: {
            type: Boolean,
            value: false,
        },
    },
    attached: function attached() {
        const { statusBarHeight, screenWidth } = wx.getSystemInfoSync();
        const boxStyle = this.getBoxStyle();
        const pages = getCurrentPages();

        this.setData({
            statusBarHeight: statusBarHeight,
            boxStyle: boxStyle,
            screenWidth: screenWidth,
            showBack: pages.length > 1,
        });
    },

    methods: {
        getBoxStyle() {
            var boxStyle = "padding: 0 0 2px 0;";
            var menuRect = this.getMenuRect();
            var statusBarHeight = this.data.statusBarHeight;

            // console.log("=-= theme", this.data);

            if (menuRect && menuRect.height < 46) {
                var height = menuRect.height,
                    top = menuRect.top;

                // 部分机型top数值异常，例如小米某机型
                if (top < statusBarHeight) {
                    top += statusBarHeight;
                }
                // 分享按钮小于导航高航高度46时做处理
                var totalPadding = 46 - height;
                var paddingTop = top - statusBarHeight;
                var paddingBottom = totalPadding - paddingTop;
                // 设置外框padding，利用flex垂直居中
                if (paddingTop - paddingBottom > 0) {
                    boxStyle =
                        "padding: " +
                        (paddingTop - paddingBottom) +
                        "px 0 0 0;";
                } else if (paddingBottom - paddingTop > 0) {
                    boxStyle =
                        "padding: 0 0 " +
                        (paddingBottom - paddingTop) +
                        "px 0;";
                } else {
                    boxStyle = "padding: 0;";
                }
            }
            return boxStyle;
        },

        getMenuRect() {
            if (this.menuRect && this.menuRect.height) {
                return this.menuRect;
            }
            try {
                this.menuRect =
                    wx.getMenuButtonBoundingClientRect &&
                    wx.getMenuButtonBoundingClientRect();
            } catch (e) {
                return null;
            }
            return this.menuRect && this.menuRect.height ? this.menuRect : null;
        },

        handleBack() {
            const pages = getCurrentPages();
            if (pages.length > 1) {
                wx.navigateBack({
                    delta: 1,
                });
            }
        },
    },
});
