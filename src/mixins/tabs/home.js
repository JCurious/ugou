import wepy from 'wepy'
export default class extends wepy.mixin {

    data = {
        swiperList: [],
        cateItems: [],
        floorData:[]
    };

    onLoad() {
        this.getSwiperList();
        this.getCateItems();
        this.getFloorData()
    }
    //获取轮播图数据
    async getSwiperList() {
        const { data: res } = await wepy.request(
            'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata'
        );
        if (res.meta.status !== 200) {
            return wepy.basicToast('轮播图获取失败！');
        }
        this.swiperList = res.message;
        this.$apply();
    }
    //获取首页分类数据
    async getCateItems() {
        const { data: res } = await wepy.request(
            'https://www.zhengzhicheng.cn/api/public/v1/home/catitems'
        );
        if (res.meta.status !== 200) {
            return wepy.basicToast('分类数据获取失败！');
        }
        this.cateItems = res.message;
        this.$apply();
    }
    //获取楼层数据
    async getFloorData(){
        const {data : res} = await wepy.get('/home/floordata')
        if (res.meta.status !== 200) {
            return wepy.basicToast('楼层数据获取失败！');
        }
        this.floorData = res.message;
        this.$apply();
    }
    methods = {
        // 点击楼层图片跳转到商品列表
        goGoodsList(url){
            wepy.navigateTo(
               {
                   url
               }
            )
        }
    };
}