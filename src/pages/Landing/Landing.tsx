import type { FormData } from '../../components/TripPlanForm/TripPlanForm'
import { Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import NavBar from '../../components/NavBar/NavBar'
import TripPlanForm from '../../components/TripPlanForm/TripPlanForm'
import './Landing.css'

function Landing() {
  const handleFormSubmit = (data: FormData) => {
    console.log('Trip plan submitted:', data)
    // TODO: Send to backend or navigate to result page
  }

  return (
    <div className="w-full">
      {/* Fixed NavBar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-full mx-auto px-12">
          <NavBar />
        </div>
      </div>

      {/* Section 1: Hero with background image */}
      <section
        aria-label="Hero"
        className="hero-section absolute top-0 left-0 w-full min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 云图装饰 — 左 */}
        <img
          src="/assets/images/clouds.png"
          alt=""
          aria-hidden
          loading="lazy"
          className="pointer-events-none absolute left-0 top-0 select-none"
          style={{ opacity: 0.6 }}
        />

        {/* 云图装饰 — 右（镜像） */}
        <img
          src="/assets/images/clouds.png"
          alt=""
          aria-hidden
          loading="lazy"
          className="pointer-events-none absolute right-0 top-0 select-none scale-x-[-1]"
          style={{ opacity: 0.6 }}
        />

        {/* 文字（z-10 覆盖在云图上） */}
        <div className="relative z-10 text-center">
          <h1 className="font-outfit text-7xl font-extrabold text-title">
            TRIPSTAR
          </h1>
          <h2
            className="font-outfit text-lg font-light mt-8"
            style={{ color: 'rgba(224,233,242,0.78)' }}
          >
            探索世界的每一种可能
          </h2>
        </div>
      </section>

      {/* Section 2: Form */}
      <section aria-label="表单" className="relative w-full bg-page py-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <TripPlanForm onSubmit={handleFormSubmit} />
        </div>
      </section>

      {/* Section 3: History */}
      <section aria-label="历史计划" className="w-full bg-page py-16">
        <div className="max-w-[1000px] mx-auto px-12">
          {/* 标题区 */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-label text-sm mb-1">最近保存</p>
              <h2 className="text-2xl font-bold text-title">历史计划</h2>
            </div>
            <Button
              type="text"
              icon={<ReloadOutlined />}
              className="text-label"
            />
          </div>

          {/* 卡片列表 */}
          <div className="flex flex-col gap-4">
            {/* 卡片占位 */}
            <div className="w-full min-h-48 bg-card-bg rounded-card border border-border-card p-5">
              {/* TODO: 历史卡片内容 */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
