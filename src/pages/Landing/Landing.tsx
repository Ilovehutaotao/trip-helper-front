import NavBar from '../../components/NavBar/NavBar'
import './Landing.css'

function Landing() {
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

      {/* Spacer for hero height */}
      <div className="w-full h-screen" />

      {/* Section 2: Form */}
      <section aria-label="表单" className="relative w-full bg-page py-16">
        <div className="max-w-[1000px] mx-auto px-12">
          {/* 步骤 01 */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-label mb-3">
              01 目的地与行程
            </h3>
            {/* TODO: 输入框、日期选择等 */}
          </div>

          {/* 步骤 02 */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-label mb-3">
              02 偏好设置
            </h3>
            {/* TODO: 下拉、多选框等 */}
          </div>

          {/* 步骤 03 */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-label mb-3">
              03 特殊需求
            </h3>
            {/* TODO: 文本域等 */}
          </div>

          {/* 提交按钮 */}
          <button className="w-full h-12 bg-accent-orange text-white font-medium rounded-btn-form">
            开始规划旅程
          </button>
        </div>
      </section>

      {/* Section 3: History */}
      <section aria-label="历史计划" className="w-full bg-page py-16">
        <div className="max-w-[1000px] mx-auto px-12">
          {/* 标题区 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-title">历史计划</h2>
            {/* TODO: Refresh Button (Ant Design) */}
          </div>

          {/* 卡片列表 */}
          <div className="flex flex-col gap-4 items-center">
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
