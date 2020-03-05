getFooter()
    function getFooter() {
      $.ajax({
        url: '../lib/footer-service.json',
        dataType: 'json',
        success: function (res) {
          // console.log(res)
          // 1. 准备一个 空字符串
          let str = ''

          // 2. 进行拼接
          // 2-1. 遍历外层数组, 先把一级标题写上
          res.forEach(item => {
            str += `
            <li class="footer-service-list">
              <ul class="footer-service-list-item">
                  <li class="footer-service-list-item-word">
                      <p class="footer-service-list-item-word-title">${item.title}</p>
                  </li>
            `

            // 2-2. 遍历里层数组, 渲染 ol 下面的 li
            //      里层数组有多少项, 就渲染几个 二级 li 放在这里
            item.list.forEach(item2 => {
              str += `
              <li class="footer-service-list-item-word">
                <a href="" class="footer-service-list-item-word-link">${item2.name}</a>
              </li>
              `
            })

            str += `
                </ul>
              </li>
            `
          })

          // 3. 渲染到页面上
          $('.layout-footer-service .footer-service').html(str)
        }
      })
    }