import wepy from 'wepy'
const STORAGE_KEY = "KW";
export default class extends wepy.mixin {

    data = {
        value: '',
        suggestList: [],
        timer: -1,
        // 搜索历史列表
        kwList: []
    };

    onShow() {
        this.kwList = wepy.getStorageSync(STORAGE_KEY) || [];
    }

    methods = {
        //搜索关键词变化，会触发这个事件处理函数
        onChange({ detail }) {
            console.log(detail);
            this.value = detail.trim()
            //清除上一次定时器，避免请求产生
            clearTimeout(this.timer)

            if (this.value.length <= 0) {
                this.suggestList = []
                return
            }

            // 赋值最新的定时器请求函数，500毫秒后如果没有清除，就能执行
            this.timer = setTimeout(() => this.getSuggestList(), 500)

        },
        // 触发了搜索e.detail
        onSearch() {
            // if (this.value.length > 0) {
            //     this.KwList.includes(this.value) || this.KwList.unshift(this.value)
            //     this.KwList = this.KwList.slice(0, 10)

            //     wepy.navigateTo({ url: '/pages/goods_list?query=' + this.value })
            // }
            this.goGoodsListAndSort(this.value)
        },
        //触发了取消
        onCancel() {

            this.suggestList = []
        },
        goGoodsDtail(goods_id) {
            wepy.navigateTo({
                url: '/pages/goods_detail/main?goods_id=' + goods_id
            })
        },
        goGoodsList(kw) {
            this.goGoodsListAndSort(kw)
        },
        clearKWList() {
            this.kwList = [];
            wepy.setStorageSync(STORAGE_KEY, this.kwList);
        }
    };
    computed = {
        isShowHistroy() {
            return !this.value
        }
    }
    goGoodsListAndSort(keyword) {
        if (keyword.length > 0) {
            this.kwList.unshift(keyword)
            this.kwList = [...new Set(this.kwList)];

            this.kwList = this.kwList.slice(0, 10);

            wepy.setStorageSync(STORAGE_KEY, this.kwList);

            wepy.navigateTo({
                url: '/pages/goods_list?query=' + keyword
            });
        }
    }
    //获取搜索建议列表
    async getSuggestList() {
        const { data: res } = await wepy.get('/goods/qsearch', { query: this.value })
        if (res.meta.status !== 200) {
            return wepy.basicToast()
        }
        this.suggestList = res.message
        this.$apply()
    }
}