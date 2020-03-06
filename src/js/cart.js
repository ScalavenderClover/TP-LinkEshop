
    // 从localStorage中获取购物车列表
    var cartList = JSON.parse(localStorage.getItem('cartList'))
    var newCartList=JSON.parse(localStorage.getItem('cartList'))
    //判断购物车列表中是不是有东西
    if (!cartList) {
      alert('购物车空空如也')
    } else {
      // 渲染页面
      bindHtml()
      // 添加事件功能
      bindEvent()
    }

    function bindHtml() {
      // 整体渲染页面
      // 全选按钮需要渲染
      //   判断一下, 如果数组里面每一个数据的 isSelect 都是 true, 就渲染成 true
      //   只要有任意一个数组的 isSelect 是 false. 就渲染成 false
      let selectAll = cartList.every(item => {
        // 如果每一条都是 true, 就会返回 true
        // 如果任意一条是 false, 就会返回 false
        return item.isSelect === true
      })

      let str = `
        <div class="top">
          <input class="selectAll" type="checkbox" ${ selectAll ? 'checked' : '' }>   全选
        </div>
        <ul class="center">
      `

      cartList.forEach(item => {
        // 每一条数据的渲染, 根据每一条信息来渲染页面
        str += `
          <li>
            <div class="select">
              <input data-id=${ item.list_id } class="selectOne" type="checkbox" ${ item.isSelect ? 'checked' : '' } >
            </div>
            <div class="info">
              <div class="cart-product-img">
              <img src="${ item.list_url }" alt="" class="cart-product-img-item">
              </div>
              <div class="cart-product-name">
              <p>${ item.list_name }</p>
              </div>
            </div>
            <p class="price">￥${ item.list_price }</p>
            <div class="number">
              <button class="sub" data-id=${ item.list_id }>-</button>
              <input type="text" value="${ item.number }" class="cart-product-numbers">
              <button class="add" data-id=${ item.list_id }>+</button>
            </div>
            <p class="subtotal">￥${ item.subtotal.toFixed(2) }</p>
            <div class="del" data-id=${ item.list_id }">删除</div>
          </li>
        `
      })

      // 选中商品数量需要渲染
      //   要把数组中的 isSelect 为 true 的数据的 number 加再一起
      //   数组常用方法叫做 filter 就能筛选数据
      let selectArr = cartList.filter(item => item.isSelect)
      // console.log(selectArr)

      // 选中商品数量计算
      let selectNumber = 0
      // 选中商品总价
      let selectPrice = 0
      selectArr.forEach(item => {
        selectNumber += item.number
        selectPrice += item.subtotal
      })

      // 去支付要不要禁用, 如果没有选中的商品, 就应该禁用
      //   只要有选中的商品, 就应该不禁用
      //   直接使用 selectArr 的 length 来判断

      str += `
        </ul>
        <div class="bottom">
          <p class="select-num">选中商品数量:  <span class="select-num-p">${ selectNumber }</span></p>
          <p class="fee-total">总价： <span class="count-price">￥${ selectPrice.toFixed(2) }</span></p>
          <button class="clear">清空购物车</button>
          <button class="pay" ${ selectArr.length ? '' : 'disabled'}> 去结算 ></button>
        </div>
      `

      // 整体添加到页面的盒子里面
      $('.cart').html(str)
    }

    function bindEvent() {
      //  全选按钮的事件
      $('.cart').on('change', '.selectAll', function () {
        // 让数组里面的每一个数据的 isSelect 都变成 自己的状态
        cartList.forEach(item => {
          item.isSelect = this.checked
        })

        ////重新渲染页面
        bindHtml()

        // 在从新存储一遍 localStorage
        localStorage.setItem('cartList', JSON.stringify(cartList))
      })

      // 单选按钮的事件
      $('.cart').on('change', '.selectOne', function () {
        // console.log($(this).data('id'))
        // 你要知道你点击的是哪一个数据的单选按钮
        const id = $(this).data('id')

        // 找到数组中 id 一样的那一条数据改变一下 isSelect 属性
        cartList.forEach(item => {
          if (item.list_id === id) {
            item.isSelect = !item.isSelect
          }
        })

        //重新渲染页面
        bindHtml()

        // 存储在lcoalStorage 里面
        localStorage.setItem('cartList', JSON.stringify(cartList))
      })

      //  减少商品数量的事件
      $('.cart').on('click', '.sub', function () {
        const id = $(this).data('id')

        // 循环数组, 把 id 对应的这个数据的 number 和 小计修改了
        cartList.forEach(item => {
          if (item.list_id === id) {
            // 当 item.number === 1 的时候, 不需要 --
            item.number > 1 ? item.number-- : ''
            item.subtotal = item.list_price * item.number
          }
        })

        //重新渲染页面
        bindHtml()

        // 存储到 localStorage
        localStorage.setItem('cartList', JSON.stringify(cartList))
      })

      //添加商品数量按钮的事件
      $('.cart').on('click', '.add', function () {
        // 拿到自己身上存储的 id
        const id = $(this).data('id')

        // 循环数组找到一个id 对应的数据
        cartList.forEach(item => {
          if (item.list_id === id) {
            item.number++
            item.subtotal = item.number * item.list_price
            
          }
        })

        // 重新渲染页面
        bindHtml()

        // 存储到 localStorage
        localStorage.setItem('cartList', JSON.stringify(cartList))
      })

      //点击删除的事件 
     
      $('.cart').on('click', '.del', function () {
        // 获取 按钮id
        const id = $(this).data('id')
        
        
        // var len=cartList.length
        // for (var i=0;i<len;i++){
        //         if(cartList[i].list_id == id){
        //             cartList.splice(i,1)
        //         }
        //  }
        let newCartList= cartList.filter(item=>{
            return item.list_id !== id
        })
        
        cartList=newCartList

        console.log(cartList)
        console.log(newCartList)
    
    
        //渲染
       bindHtml()
         
       // 存储到 localStorage
       localStorage.setItem('cartList', JSON.stringify(cartList))
    })
   
      //清空购物车
      $('.cart').on('click', '.clear', function () {
        let newCartList3=[];

       cartList=[]

        bindHtml()

        // 存储到 localStorage
        localStorage.setItem('cartList', JSON.stringify(cartList))
        
      })
    }