import { Button, Select } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

function NavBar() {
  return (
    <nav className="flex items-center h-18 bg-transparent">
      {/* 左侧：Logo */}
      <Button type="text" className="!p-0">
        <span className="font-outfit font-bold text-primary">TRIPSTAR</span>
      </Button>

      {/* 中间：flex-1 占位空白 */}
      <div className="flex-1" />

      {/* 右侧：语言选择 + 设置 + CTA */}
      <div className="flex items-center gap-0">
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
