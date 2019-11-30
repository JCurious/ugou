import wepy from 'wepy'
export default class extends wepy.mixin {

    data = {
        goods_id:'',
        detail:null
    }

  methods = {
      
  }
  onLoad({goods_id}){
     this.goods_id = goods_id
     this.getGoodsDetail()
  }

  async getGoodsDetail(){
    const {data:res} = await wepy.get('/goods/detail',{goods_id:this.goods_id})
    if (res.meta.status !== 200){
        return wepy.basicToast()
    }
    this.detail =res.message
    // console.log(this.detail);
    this.$apply()
    
  }
}