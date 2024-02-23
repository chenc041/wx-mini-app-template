Component({
    properties: {
        current: {
            type: Number,
            value: "",
        },
    },
    data: {
        menu: [
            {
                label: "社区",
                icon: "community",
                path: "/pages/community/home/index",
            },
            {
                label: "商城",
                icon: "mall",
                path: "/pages/mall/index",
            },
            {
                label: "我的",
                icon: "my",
                path: "/pages/my/index",
            },
        ],
    },

    methods: {
        handleClick(e) {
            let { item = {} } = e.currentTarget.dataset;
            wx.redirectTo({
                url: item.path,
            });
        },
    },
});
