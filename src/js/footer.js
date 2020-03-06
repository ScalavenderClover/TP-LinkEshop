getFooter()
    function getFooter() {
      $.ajax({
        url: '../lib/footer-service.json',
        dataType: 'json',
        success: function (res) {
          // 准备一个 空字符串
          let str = ''

          //拼接
          //遍历外层数组
          res.forEach(item => {
            str += `
            <li class="footer-service-list">
              <ul class="footer-service-list-item">
                  <li class="footer-service-list-item-word">
                      <p class="footer-service-list-item-word-title">${item.title}</p>
                  </li>
            `

            //  遍历里层数组 li
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

          // 渲染到页面上
          $('.layout-footer-service .footer-service').html(str)
        }
      })
    }