'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { ChevronRight, RotateCcw, Save, CheckCircle, ArrowLeft } from 'lucide-react'

const SizeSelector = React.memo(({ onSelect, selectedSize }) => (
  <div className="flex flex-col gap-3">
    <div className="grid grid-cols-2 gap-3">
      {/* 2列×5行のグリッドに直接配置 */}
      {[
        'XXS以下', '4XL以上',
        'XS', '3XL',
        'S', '2XL',
        'M', 'XL',
        'FREE', 'L'
      ].map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={`w-full bg-gray-800 text-gray-100 p-4 rounded-xl 
                   hover:bg-gray-700 transition-colors text-center
                   ${selectedSize === size ? 'ring-2 ring-blue-500' : ''}`}
        >
          {size}
        </button>
      ))}
    </div>
    <button
      onClick={() => onSelect(selectedSize)}
      disabled={!selectedSize}
      className="w-full bg-blue-900 text-white p-4 rounded-2xl text-lg 
                font-semibold mt-4 hover:bg-blue-800 active:bg-blue-700 
                transition-colors disabled:bg-gray-700 
                disabled:cursor-not-allowed"
    >
      次へ
    </button>
  </div>
));

const CATEGORIES = {
    TS: {
      name: 'トップス（半袖）',
      steps: [
        { label: 'No', key: 'id' },
        { label: '商品サイズ', key: 'size', type: 'select' },  // typeを追加
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
        { label: '商品サイズ', key: 'size', type: 'select' },  // typeを追加
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
        { label: '商品サイズ', key: 'size', type: 'select' },  // typeを追加
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
        { label: '商品サイズ', key: 'size', type: 'select' },  // typeを追加
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
        { label: '商品サイズ', key: 'size', type: 'select' },  // typeを追加
        { label: 'ウエスト', key: 'waist', unit: 'cm' },
        { label: 'スカート丈', key: 'skirtLength', unit: 'cm' },
        { label: '脇丈', key: 'totalLength', unit: 'cm' }
      ]
    },
    OP: {
      name: 'ワンピース',
      steps: [
        { label: 'No', key: 'id' },
        { label: '商品サイズ', key: 'size', type: 'select' },  // typeを追加
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
        { label: '商品サイズ', key: 'size', type: 'select' },  // typeを追加
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

const NumberButton = React.memo(({ children, onClick, className = '', style = {} }) => (
    <button
      onClick={onClick}
      style={{ minHeight: '100px', minWidth: '100px', ...style }}
      className={`text-2xl font-semibold text-gray-100 
        bg-gray-800 rounded-2xl shadow-md flex-1
        hover:bg-gray-700 active:bg-gray-600 active:shadow-sm transition-all
        flex items-center justify-center ${className}`}
    >
      {children}
    </button>
));
  
const CategoryButton = React.memo(({ category, name, onClick, selected }) => (
    <button
      onClick={() => onClick(category)}
      style={{ 
        height: '64px',
        width: '100%'
      }}
      className={`text-xl font-semibold 
        rounded-2xl shadow-md 
        flex items-center justify-center transition-colors
        ${selected 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-800 text-gray-100 hover:bg-gray-700'}
        px-4`}
    >
      {name}
    </button>
));
  
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
  const [isEditMode, setIsEditMode] = useState(false)

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
    setIsEditMode(false) 
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
        measurements: data,
        isEditMode  // 編集モードフラグを追加
      });
      
      const response = await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: currentCategory,
          measurements: data,
          isEditMode  // 編集モードフラグを送信
        })
      })

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
        // handleNext内の編集モード部分を以下のように修正
if (isEditMode) {
    try {
        // handleNext内の編集モード部分で
        console.log(`送信ID: ${inputValue}, 型: ${typeof inputValue}`);
        console.log(`データ取得開始: ID = ${inputValue}`);
        const response = await fetch(`${GAS_URL}?id=${inputValue}`);
        console.log('レスポンス:', response);
        const data = await response.json();
        console.log('取得データ:', data);
        
        if (data.success && data.measurements) {
            setMeasurements({ id: inputValue, ...data.measurements });
        } else {
            setError('指定されたIDのデータが見つかりませんでした');
            return;
        }
    } catch (error) {
        console.error('エラー詳細:', error);
        setError('データの取得に失敗しました');
        return;
    }
} else {
            setMeasurements({ id: inputValue })
        }
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
      <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="w-full max-w-sm md:max-w-xs flex flex-col h-[600px] md:h-[500px]">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-100">保存完了!</h2>
          <p className="text-center mb-8 text-gray-300">測定値の登録が完了しました</p>
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="container mx-auto max-w-sm">
          <div className="mb-6 flex items-center">
            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-gray-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-100 ml-2">カテゴリを選択</h1>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            width: '100%'
          }}>
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
    );
}

return (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div style={{ 
      width: '100%',
      maxWidth: '360px',
      margin: '0 auto'
    }}>
        {/* ヘッダー */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-100 flex-grow text-center">
            {currentCategory ? CATEGORIES[currentCategory].name : '新規登録'}
          </h1>
        </div>

        {/* 編集モード切り替えボタン（IDの入力画面の時のみ表示） */}
        {!currentCategory && !showCategorySelect && (
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`mb-4 w-full p-3 rounded-xl text-sm font-medium transition-colors
              ${isEditMode 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            {isEditMode ? '編集モード：ON' : '編集モード：OFF'}
          </button>
        )}

        {/* エラーメッセージ */}
        {error && (
          <div className="mb-4 p-4 bg-red-900/50 text-red-200 rounded-2xl">
            {error}
          </div>
        )}

        {/* 入力表示エリア */}
        <div className="mb-4 p-4 bg-gray-800 rounded-3xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-100 mb-2">{currentStep?.label}</h2>
          <div className="text-4xl md:text-5xl font-mono h-16 flex items-center justify-end text-gray-100">
            {inputValue}{currentStep?.unit}
          </div>
        </div>
  
        {/* テンキーエリア */}
        {currentStep?.type === 'select' ? (
  <SizeSelector 
    onSelect={(size) => {
      setInputValue(size);
      handleNext();
    }}
    selectedSize={inputValue}  // inputValueを渡す
  />
) : (
          <div className="flex-1 flex flex-col gap-3" style={{ minHeight: '400px' }}>
            <div className="flex-1 flex gap-3">
              <NumberButton onClick={() => handleNumberClick('7')}>7</NumberButton>
              <NumberButton onClick={() => handleNumberClick('8')}>8</NumberButton>
              <NumberButton onClick={() => handleNumberClick('9')}>9</NumberButton>
            </div>
            <div className="flex-1 flex gap-3">
              <NumberButton onClick={() => handleNumberClick('4')}>4</NumberButton>
              <NumberButton onClick={() => handleNumberClick('5')}>5</NumberButton>
              <NumberButton onClick={() => handleNumberClick('6')}>6</NumberButton>
            </div>
            <div className="flex-1 flex gap-3">
              <NumberButton onClick={() => handleNumberClick('1')}>1</NumberButton>
              <NumberButton onClick={() => handleNumberClick('2')}>2</NumberButton>
              <NumberButton onClick={() => handleNumberClick('3')}>3</NumberButton>
            </div>
            <div className="flex-1 flex gap-3">
              <NumberButton onClick={() => handleNumberClick('0')}>0</NumberButton>
              <NumberButton onClick={handleDelete} className="bg-gray-700">←</NumberButton>
              <button
                onClick={handleNext}
                disabled={!inputValue || isSaving}
                style={{ height: '100px', minWidth: '100px' }}
                className="flex-1 bg-blue-900 text-white text-xl font-semibold
                         rounded-2xl flex items-center justify-center gap-2 
                         disabled:bg-gray-700 disabled:cursor-not-allowed
                         hover:bg-blue-800 active:bg-blue-700 transition-colors"
              >
                {isSaving ? '...' : '次へ'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}