import { Button, Select } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

function NavBar() {
  return (
    <nav className="flex items-center justify-between h-18 bg-transparent">
      {/* 左侧：Logo */}
      <Button type="text" className="!p-0">
        <span className="font-outfit font-bold text-primary">TRIPSTAR</span>
      </Button>

      {/* 中间：语言选择 */}
      <Select
        variant="borderless"
        defaultValue="zh"
        style={{ width: 80 }}
        options={[
          { label: '中文', value: 'zh' },
          { label: 'English', value: 'en' },
          { label: '日本語', value: 'ja' },
        ]}
      />

      {/* 右侧：配置 + CTA */}
      <div className="flex items-center gap-2">
        <Button
          type="text"
          icon={<SettingOutlined />}
          className="!text-primary"
        />
        <Button
          type="primary"
          className="rounded-btn-cta bg-accent-orange !border-0"
        >
          开始定制
        </Button>
      </div>
    </nav>
  )
}

export default NavBar
