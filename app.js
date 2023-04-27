//載入Express
const express = require('express')
const app = express()

//宣告路由相關內容
const port = 3000

//載入外部資料
const restaurantList = require('./restaurant.json')

//告訴express使用handlebars
const exphbs = require('express-handlebars')


//設定樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//靜態網頁
app.use(express.static('public'))

//建立首頁路由
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results } )
})

//建立show路由
app.get('/restaurants/:restaurant_id', (req, res) => {
  // console.log('req.params.restaurant_id', req.params)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant: restaurant })
})

//建立搜尋功能路由
app.get('/search', (req, res) => {
  const restaurants = restaurantList.results.filter( restaurant => {
    const keyword = req.query.keyword.split(' ').join('')
    return restaurant.name.toLowerCase().split(' ').join('').includes(keyword.toLowerCase()) 
  })
  res.render('index', { restaurants: restaurants, keyword: req.query.keyword })
})

//啟動伺服器
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})