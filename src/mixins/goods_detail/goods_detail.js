import wepy from 'wepy';

export default class extends wepy.mixin {
    data = {
        id: '',
        detail: null
    }

    methods = {
        
    }

    async getGoodsDetail() {
        const { data: res } = await wepy.get('/goods/detail', { goods_id: this.id });

        if (res.meta.status !== 200) {
            wepy.basicToast();
            return;
        }

        this.detail = res.message;
        this.$apply();
    }

    onLoad({ goods_id }) {
        this.id = goods_id;
        this.getGoodsDetail();
    }
}
