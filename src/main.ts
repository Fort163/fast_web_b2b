import appComponent from './app/app'
import  {createApp} from 'vue'

const app = createApp({
  render: (h:any) => h(appComponent),
})
app.mount('#mainDiv')
