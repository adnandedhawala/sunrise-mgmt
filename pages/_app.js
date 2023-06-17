import { ConfigProvider } from 'antd'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#501800",
        colorInfo: "#0d6696",
        colorTextBase: "#444444",
        fontSize: 14,
        wireframe: true
      },
    }}
  >
  <Component {...pageProps} />
  </ConfigProvider>
}

export default MyApp
