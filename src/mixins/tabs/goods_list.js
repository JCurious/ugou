import wepy from 'wepy'
export default class extends wepy.mixin {

    data = {
        query: '',       //查询关键词
        cid: '',         //商品分类的id
        pagenum: 1,      //页码值
        pagesize: 10,    //每页显示多少条数据
        goodslist: [],   //商品列表
        total: 0,        //商品总数量
        canLoad: true,  // 是否还可以继续加载。
        isLoading: false
    }
    methods = {
        goGoodsDetail(goods_id) {
            ulr = "/pages/goods_detail/main?goods_id=" + goods_id
        }
    }
    onLoad({ query = '', cid = '' }) {
        this.query = query
        this.cid = cid
        this.getGoodsList()
    }
    async getGoodsList() {
        const { query, cid, pagenum, pagesize } = this;
        const { data: res } = await wepy.get('/goods/search', { query, cid, pagenum, pagesize })
        // async getGoodsList(cb) {
        //     const { data: res } = await wepy.get('/goods/search', {
        //       query: this.query,
        //       cid: this.cid,
        //       pagenum: this.pagenum,
        //       pagesize: this.pagesize
        //     })
        if (res.meta.status !== 200) {
            return wepy.basicToast()
        }

        this.goodslist = [...this.goodslist, ...res.message.goods]

        this.total = res.message.total
        this.isLoading = false
        this.$apply()
    }
    onReachBottom() {
        if (!this.isLoading &&
            this.goodslist.length < this.total) {
            this.pagenum++;
            this.getGoodsList()
        } else
            this.canLoad = false;
    }
    onPullDownRefresh() {
        
    }

}