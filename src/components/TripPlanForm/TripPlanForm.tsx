import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input, Select, DatePicker, Button, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

export type FormData = {
  cities: { name: string; days: number }[]
  departureDate: dayjs.Dayjs | null
  transportMode: string
  accommodationStyle: string
  interests: string[]
  specialRequirements: string
}

interface TripPlanFormProps {
  onSubmit?: (data: FormData) => void
}

function TripPlanForm({ onSubmit }: TripPlanFormProps) {
  const { control, watch, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      cities: [{ name: '', days: 1 }],
      departureDate: null,
      transportMode: 'public',
      accommodationStyle: 'budget',
      interests: [],
      specialRequirements: '',
    },
  })

  const cities = watch('cities')
  const departureDate = watch('departureDate')
  const interests = watch('interests')

  const totalDays = cities.reduce((sum, city) => sum + city.days, 0)

  const addCity = () => {
    setValue('cities', [...cities, { name: '', days: 1 }])
  }

  const updateCity = (index: number, field: 'name' | 'days', value: string | number) => {
    const newCities = [...cities]
    newCities[index] = { ...newCities[index], [field]: value }
    setValue('cities', newCities)
  }

  const handleFormSubmit = (data: FormData) => {
    onSubmit?.(data)
  }

  const interestOptions = [
    { label: '历史文化', value: 'history' },
    { label: '自然风光', value: 'nature' },
    { label: '美食', value: 'food' },
    { label: '购物', value: 'shopping' },
    { label: '艺术', value: 'art' },
    { label: '休闲', value: 'leisure' },
  ]

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full" style={{
      backgroundColor: 'rgba(12, 23, 32, 0.56)',
      border: '0.8px solid rgba(236, 243, 250, 0.2)',
      borderRadius: '22px',
      padding: '20px',
    }}>
      {/* 步骤 01: 目的地与行程 */}
      <div className="mb-8">
        <h3 className="step-title text-label">
          <span className="step-number">01</span>
          目的地与行程
        </h3>

        <div className="space-y-3 mb-4">
          {cities.map((city, index) => (
            <div key={index} className="city-row">
              <div className="flex flex-col">
                <label className="form-label">
                  <span className="text-accent-orange">*</span> 城市 {index + 1}
                </label>
                <Input
                  placeholder="输入城市名称，例如：中国-杭州"
                  value={city.name}
                  onChange={(e) => updateCity(index, 'name', e.target.value)}
                  className="h-10 rounded-radius-btn-sm"
                  style={{
                    backgroundColor: 'var(--color-input-bg)',
                    borderColor: 'var(--color-border-input)',
                  }}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="form-label">停留天数</label>
                <InputNumber
                  min={1}
                  max={15}
                  value={city.days}
                  onChange={(val) => updateCity(index, 'days', val || 1)}
                  className="!w-full h-10"
                  style={{
                    backgroundColor: 'var(--color-input-bg)',
                    borderColor: 'var(--color-border-input)',
                    width: '100%',
                  }}
                />
              </div>
            </div>
          ))}

          {cities.length > 0 && (
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addCity}
              className="h-10 rounded-radius-btn-sm"
              style={{
                borderColor: 'rgba(245, 89, 61, 0.5)',
                color: 'rgba(245, 89, 61, 0.8)',
              }}
            >
              添加城市
            </Button>
          )}
        </div>

        {/* 出发日期和旅行天数 */}
        <div className="grid-date mb-3">
          <div className="flex flex-col">
            <label className="form-label">
              <span className="text-accent-orange">*</span> 出发日期
            </label>
            <Controller
              name="departureDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  className="h-10"
                  style={{
                    backgroundColor: 'var(--color-input-bg)',
                    borderColor: 'var(--color-border-input)',
                  }}
                />
              )}
            />
          </div>
          <div className="flex flex-col">
            <label className="form-label">旅行天数</label>
            <div
              className="h-10 border rounded-radius-btn-sm px-3 flex items-center"
              style={{
                backgroundColor: 'rgba(19, 34, 46, 0.8)',
                borderColor: 'rgba(215, 110, 66, 0.42)',
              }}
            >
              <span className="text-title font-medium">{totalDays} 天</span>
            </div>
          </div>
        </div>
      </div>

      {/* 步骤 02: 偏好设置 */}
      <div className="mb-8">
        <h3 className="step-title text-label">
          <span className="step-number">02</span>
          偏好设置
        </h3>

        {/* 交通方式和住宿风格 */}
        <div className="grid2 mb-4">
          <div className="flex flex-col">
            <label className="form-label">交通方式</label>
            <Controller
              name="transportMode"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { label: '公共交通', value: 'public' },
                    { label: '自驾', value: 'car' },
                    { label: '骑行', value: 'bike' },
                  ]}
                  style={{
                    backgroundColor: 'var(--color-input-bg)',
                    borderColor: 'var(--color-border-input)',
                  }}
                />
              )}
            />
          </div>
          <div className="flex flex-col">
            <label className="form-label">住宿风格</label>
            <Controller
              name="accommodationStyle"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { label: '经济实惠', value: 'budget' },
                    { label: '中档舒适', value: 'comfort' },
                    { label: '豪华享受', value: 'luxury' },
                  ]}
                  style={{
                    backgroundColor: 'var(--color-input-bg)',
                    borderColor: 'var(--color-border-input)',
                  }}
                />
              )}
            />
          </div>
        </div>

        {/* 旅行兴趣多选 */}
        <div>
          <label className="form-label mb-3 block">旅行兴趣</label>
          <Controller
            name="interests"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-6 gap-3 mb-3">
                {interestOptions.map((option) => (
                  <Button
                    key={option.value}
                    type={interests.includes(option.value) ? 'primary' : 'default'}
                    onClick={() => {
                      const newInterests = interests.includes(option.value)
                        ? interests.filter((i) => i !== option.value)
                        : [...interests, option.value]
                      field.onChange(newInterests)
                    }}
                    className="h-10 rounded-radius-btn-sm transition-colors"
                    style={
                      interests.includes(option.value)
                        ? {
                            backgroundColor: 'rgba(245, 89, 61, 0.2)',
                            borderColor: 'rgba(245, 89, 61, 0.5)',
                            color: 'rgba(245, 89, 61, 0.9)',
                          }
                        : {
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(236, 243, 250, 0.3)',
                            color: 'rgba(236, 243, 250, 0.7)',
                          }
                    }
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      {/* 步骤 03: 特殊需求 */}
      <div className="mb-6">
        <h3 className="step-title text-label">
          <span className="step-number">03</span>
          特殊需求
        </h3>

        <Controller
          name="specialRequirements"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              placeholder="告诉我你的特殊需求，比如：带老人出行、想看日出、对花粉过敏……"
              rows={6}
              className="rounded-radius-btn-sm"
              style={{
                backgroundColor: 'var(--color-input-bg)',
                borderColor: 'var(--color-border-input)',
                color: 'rgba(236, 243, 250, 0.7)',
              }}
            />
          )}
        />
      </div>

      {/* 提交按钮 */}
      <Button
        htmlType="submit"
        block
        className="h-14 text-white font-medium text-base transition-all"
        style={{
          backgroundColor: 'var(--color-accent-orange)',
          borderRadius: 'var(--radius-btn-cta)',
          border: 'none',
        }}
      >
        开始规划旅程
      </Button>
    </form>
  )
}

export default TripPlanForm

