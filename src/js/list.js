console.log($.cookie('name'));

    console.log($('.login'));
    $(function() {
        if ($.cookie('name')) {
          console.log('用户登录')
            $('.login').text($.cookie('name'));
        }else{
          console.log('用户未登录')
        }
    })

    $('.header-cart').hover(function(){
        $('.header-cart').addClass("active")
    },function (){
        $('.header-cart').removeClass("active")
    }
    )

    var mySwiper = new Swiper ('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 1000
        },
        effect: 'fade',

        //分页器
        pagination: {
          el: '.swiper-pagination',
        },

        //前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // 滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
      })


    getList()

    function getList() {
      $.ajax({
        url: '../lib/nav_top.json',
        dataType: 'json',
        success: function (res) {
          console.log(res)

          // 准备一个空字符串
          let str = ''

          //渲染一级的 a标签
          res.forEach(item => {
            str += `<a class="banner-nav-list-item">${ item.name }</a>`
          })

          // 填充到 container2里面
          $('.container2 ')
            .html(str)
            .on({
              mouseenter: () => $('.nav_box').stop().slideDown(),
              mouseleave: () => $('.nav_box').stop().slideUp()
            })
            .children('a') // 找到所有的一级菜单下的 a
            .on('mouseover', function () {
              //知道自己移入的时哪一个 a
              const index = $(this).index()
              // 找到要渲染的数组
              const list = res[index].list
              //  用我们找到的数组把 nav_box 位置渲染了就可以了
              let str = ''

              //进行组装
              list.forEach(item => {
                str += `
                  <li>
                    <div>
                      <img src="${ item.list_url }" alt="">
                    </div>
                    <p class="title">${ item.list_name }</p>
                    <p class="model">${item.list_model}</p>
                    <span class="price">￥${ item.list_price }</span>
                  </li>
                `
              })

              // 填充到页面里面
              $('.nav_box > ul').html(str)
            })

          //给 nav_box 添加一个移入移出事件
          $('.nav_box')
            .on({
              mouseover: function () { $(this).finish().show() },
              mouseout: function () { $(this).finish().slideUp() }
            })
        }
      })
    }