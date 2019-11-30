import wepy from 'wepy'
export default class extends wepy.mixin {

    data = {
        //所有分类数据列表
        cateList: [],
        secondCate:[],
        // 默认被激活的索引
        active: 0,
        //当前屏幕的高度
        wh: 0
    };

    onLoad() {
        this.getCateList()
        this.getWindowHeight()
    }
    methods = {
        onChange(e) {
            this.secondCate = this.cateList[e.detail].children
        },
        //点击跳转到商品列表，同时把商品分类的id传递过去
        goGoodsList(cid){
            console.log(cid);
            
            wepy.navigateTo({
                url:'/pages/goods_list?id='+ cid
            })
        }
    }
    async getCateList() {
        const { data: res } = await wepy.get('/categories')
        if (res.meta.status !== 200) {
            return wepy.basicToast();
        }
        this.cateList = res.message;
        this.secondCate = this.cateList[this.active].children
        this.$apply();
        console.log(this.secondCate);

    }

    //动态获取屏幕可用的高度
    async getWindowHeight() {
        try {
            const res = await wepy.getSystemInfo()
            this.wh = res.windowHeight
            this.$apply()
        } catch (error) { }

    }
}