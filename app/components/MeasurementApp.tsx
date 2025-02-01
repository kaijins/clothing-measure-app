'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { ChevronRight, RotateCcw, Save, CheckCircle, ArrowLeft } from 'lucide-react'

const CATEGORIES = {
    TS: {
      name: 'トップス（半袖）',
      steps: [
        { label: 'No', key: 'id' },
        { label: '肩幅', key: 'shoulderWidth', unit: 'cm' },
        { label: '身幅', key: 'chestWidth', unit: 'cm' },
        { label: '着丈', key: 'length', unit: 'cm' },
        { label: '裾幅', key: 'hemWidth', unit: 'cm' },
        { label: '袖丈', key: 'sleeveLength', unit: 'cm' }
      ]
    },
    TL: {
      name: 'トップス（長袖）',
      steps: [
        { label: 'No', key: 'id' },
        { label: '肩幅', key: 'shoulderWidth', unit: 'cm' },
        { label: '身幅', key: 'chestWidth', unit: 'cm' },
        { label: '着丈', key: 'length', unit: 'cm' },
        { label: '裾幅', key: 'hemWidth', unit: 'cm' },
        { label: '袖丈', key: 'sleeveLength', unit: 'cm' }
      ]
    },
    JK: {
      name: 'ジャケット',
      steps: [
        { label: 'No', key: 'id' },
        { label: '肩幅', key: 'shoulderWidth', unit: 'cm' },
        { label: '身幅', key: 'chestWidth', unit: 'cm' },
        { label: '着丈', key: 'length', unit: 'cm' },
        { label: '裾幅', key: 'hemWidth', unit: 'cm' },
        { label: '袖丈', key: 'sleeveLength', unit: 'cm' }
      ]
    },
    PT: {
      name: 'パンツ',
      steps: [
        { label: 'No', key: 'id' },
        { label: 'ウエスト', key: 'waist', unit: 'cm' },
        { label: '股上', key: 'rise', unit: 'cm' },
        { label: '股下', key: 'inseam', unit: 'cm' },
        { label: '総丈', key: 'totalLength', unit: 'cm' },
        { label: 'わたり幅', key: 'thighWidth', unit: 'cm' },
        { label: '裾幅', key: 'hemWidth', unit: 'cm' }
      ]
    },
    SK: {
      name: 'スカート',
      steps: [
        { label: 'No', key: 'id' },
        { label: 'ウエスト', key: 'waist', unit: 'cm' },
        { label: 'スカート丈', key: 'skirtLength', unit: 'cm' },
        { label: '脇丈', key: 'totalLength', unit: 'cm' }
      ]
    },
    OP: {
      name: 'ワンピース',
      steps: [
        { label: 'No', key: 'id' },
        { label: '肩幅', key: 'shoulderWidth', unit: 'cm' },
        { label: 'バスト', key: 'chestWidth', unit: 'cm' },
        { label: '着丈', key: 'length', unit: 'cm' },
        { label: '袖丈', key: 'sleeveLength', unit: 'cm' }
      ]
    },
    SET: {
      name: 'セットアップ',
      steps: [
        { label: 'No', key: 'id' },
        { label: '肩幅', key: 'shoulderWidth', unit: 'cm' },
        { label: '身幅', key: 'chestWidth', unit: 'cm' },
        { label: '着丈', key: 'length', unit: 'cm' },
        { label: '裾幅', key: 'hemWidth', unit: 'cm' },
        { label: '袖丈', key: 'sleeveLength', unit: 'cm' },
        { label: 'ボトムスウエスト', key: 'waist', unit: 'cm' },
        { label: 'ボトムス総丈', key: 'totalLength', unit: 'cm' }
      ]
    },
    BG: {
      name: 'バッグ',
      steps: [
        { label: 'No', key: 'id' },
        { label: 'バッグ横幅', key: 'width', unit: 'cm' },
        { label: 'バッグ高さ', key: 'height', unit: 'cm' },
        { label: 'バッグマチ', key: 'depth', unit: 'cm' }
      ]
    }
  }

const GAS_URL = 'https://script.google.com/macros/s/AKfycbyFI1L0kd5BYSSX6-y4HeWLuIXv_iFoCPsulE_Glu4TQnTSJ4_HFWoLhNfrvImG0MGZKQ/exec'

const NumberButton = React.memo(({ children, onClick }) => (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '80px'
      }}
      className="bg-white rounded-2xl shadow-md text-2xl font-semibold text-gray-800
                 flex items-center justify-center
                 hover:bg-gray-50 active:bg-gray-100"
    >
      {children}
    </button>
  ))

function CategoryButton({ category, name, onClick, selected }) {
  return (
    <button
      onClick={() => onClick(category)}
      className={`w-full p-4 rounded-2xl text-lg font-semibold mb-2
      flex items-center justify-center gap-2 transition-colors
      ${selected ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
    >
      {name}
    </button>
  )
}

export default function MeasurementApp() {
  const [isClient, setIsClient] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [showCategorySelect, setShowCategorySelect] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [measurements, setMeasurements] = useState<{[key: string]: string}>({})
  const [inputValue, setInputValue] = useState('')
  const [showComplete, setShowComplete] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsClient(true)
  }, [])

  const resetForm = () => {
    setCurrentCategory(null)
    setShowCategorySelect(false)
    setCurrentStepIndex(0)
    setMeasurements({})
    setInputValue('')
    setShowComplete(false)
    setError('')
  }

  const handleNumberClick = (num: string) => {
    if (inputValue.length < 3) {
      setInputValue(prev => prev + num)
    }
  }

  const handleDelete = () => {
    setInputValue(prev => prev.slice(0, -1))
  }

  const handleClear = () => {
    setInputValue('')
  }

  const handleCategorySelect = (category: string) => {
    setCurrentCategory(category)
    setShowCategorySelect(false)
    setCurrentStepIndex(1)
  }

  const handleBack = () => {
    if (showCategorySelect) {
      setShowCategorySelect(false)
      setInputValue(measurements.id || '')
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
      const prevStep = CATEGORIES[currentCategory!].steps[currentStepIndex - 1]
      setInputValue(measurements[prevStep.key] || '')
    }
  }

  const saveToSpreadsheet = async (data: any) => {
    try {
      setIsSaving(true)
      console.log('送信データ:', {
        category: currentCategory,
        measurements: data
      });
      const response = await fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify({
          category: currentCategory,
          measurements: data
        })
      })

      if (!response.ok) throw new Error('保存に失敗しました')
      
      const result = await response.json()
      if (!result.success) throw new Error(result.message || '保存に失敗しました')
      
      return true
    } catch (error) {
      console.error('Save error:', error)
      setError(error.message || '保存に失敗しました')
      return false
    } finally {
      setIsSaving(false)
    }
  }

  const handleNext = async () => {
    if (!inputValue) return

    if (!currentCategory && !showCategorySelect) {
      setMeasurements({ id: inputValue })
      setShowCategorySelect(true)
      setInputValue('')
      return
    }

    const category = CATEGORIES[currentCategory!]
    const currentStep = category.steps[currentStepIndex]
    
    const updatedMeasurements = {
      ...measurements,
      [currentStep.key]: inputValue
    }
    setMeasurements(updatedMeasurements)

    if (currentStepIndex < category.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
      setInputValue('')
    } else {
      const success = await saveToSpreadsheet(updatedMeasurements)
      if (success) {
        setShowComplete(true)
      }
    }
  }

  const getCurrentStep = () => {
    if (!currentCategory) {
      return { label: 'No', key: 'id' }
    }
    const category = CATEGORIES[currentCategory]
    return category.steps[currentStepIndex]
  }

  const currentStep = getCurrentStep()

  if (!isClient) {
    return null
  }

  if (showComplete) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="w-full max-w-sm md:max-w-xs flex flex-col h-[600px] md:h-[500px]">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-4">保存完了!</h2>
          <p className="text-center mb-8 text-gray-600">測定値の登録が完了しました</p>
          <button
            onClick={resetForm}
            className="w-full bg-blue-500 text-white p-4 rounded-2xl text-lg font-semibold
                     hover:bg-blue-600 active:bg-blue-700 transition-colors"
          >
            新規入力を開始
          </button>
        </div>
      </div>
    )
  }

  if (showCategorySelect) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm md:max-w-xs">
          <div className="mb-4 flex items-center">
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 ml-2">カテゴリを選択</h1>
          </div>
          <div className="space-y-2">
            {Object.entries(CATEGORIES).map(([key, value]) => (
              <CategoryButton
                key={key}
                category={key}
                name={value.name}
                onClick={handleCategorySelect}
                selected={currentCategory === key}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div 
        style={{
          width: '100%',
          maxWidth: '360px',
          margin: '0 auto',
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          {currentStepIndex > 0 && (
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-xl font-bold text-gray-800 flex-grow text-center">
            {currentCategory ? CATEGORIES[currentCategory].name : '新規登録'}
          </h1>
          {currentCategory && (
            <span className="text-gray-600 font-medium">
              {currentStepIndex + 1} / {CATEGORIES[currentCategory].steps.length}
            </span>
          )}
        </div>

        {/* エラーメッセージ */}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-2xl">
            {error}
          </div>
        )}

        {/* 入力表示エリア */}
<div className="p-6 bg-white rounded-3xl shadow-lg mb-6">
  <h2 className="text-lg font-bold text-gray-600 mb-2">{currentStep?.label}</h2>
  <div className="text-4xl md:text-5xl font-mono h-16 flex items-center text-gray-800">
    {inputValue}{currentStep?.unit}
  </div>
</div>

        {/* テンキー */}
<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    flex: '1',
    marginBottom: '16px'
  }}
>
  <NumberButton onClick={() => handleNumberClick('1')}>1</NumberButton>
  <NumberButton onClick={() => handleNumberClick('2')}>2</NumberButton>
  <NumberButton onClick={() => handleNumberClick('3')}>3</NumberButton>
  <NumberButton onClick={() => handleNumberClick('4')}>4</NumberButton>
  <NumberButton onClick={() => handleNumberClick('5')}>5</NumberButton>
  <NumberButton onClick={() => handleNumberClick('6')}>6</NumberButton>
  <NumberButton onClick={() => handleNumberClick('7')}>7</NumberButton>
  <NumberButton onClick={() => handleNumberClick('8')}>8</NumberButton>
  <NumberButton onClick={() => handleNumberClick('9')}>9</NumberButton>
  <NumberButton onClick={handleClear}>
    <RotateCcw className="w-8 h-8" />
  </NumberButton>
  <NumberButton onClick={() => handleNumberClick('0')}>0</NumberButton>
  <NumberButton onClick={handleDelete}>←</NumberButton>
</div>

        {/* 次へ/登録ボタン */}
        <button
          onClick={handleNext}
          disabled={!inputValue || isSaving}
          className="w-full bg-blue-500 text-white p-4 rounded-2xl text-lg font-semibold
                   flex items-center justify-center gap-2 
                   disabled:bg-gray-300 disabled:cursor-not-allowed
                   hover:bg-blue-600 active:bg-blue-700 transition-colors"
        >
          {isSaving ? (
            '保存中...'
          ) : currentCategory && currentStepIndex === CATEGORIES[currentCategory].steps.length - 1 ? (
            <>登録 <Save className="w-6 h-6" /></>
          ) : (
            <>次へ <ChevronRight className="w-6 h-6" /></>
          )}
        </button>
      </div>
    </div>
  )
}