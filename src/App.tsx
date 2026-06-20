import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import Landing from './pages/Landing/Landing'

const antdTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: 'rgb(245, 89, 61)',
    colorBgContainer: 'rgba(14, 27, 38, 0.66)',
    colorBgElevated: 'rgb(10, 25, 38)',
    colorBgLayout: 'rgb(10, 25, 38)',
    colorText: 'rgb(236, 243, 250)',
    colorTextSecondary: 'rgba(236, 243, 250, 0.65)',
    colorBorder: 'rgba(236, 243, 250, 0.2)',
    colorBorderSecondary: 'rgba(203, 227, 255, 0.12)',
    borderRadius: 12,
    borderRadiusLG: 20,
    borderRadiusSM: 6,
    fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif",
    fontSize: 14,
  },
}

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
