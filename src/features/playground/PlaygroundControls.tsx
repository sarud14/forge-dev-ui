'use client'

import { useState, type ChangeEvent, type JSX } from 'react'
import { Button, Dialog, Input, Select, Tabs, Tooltip, toast } from '@/components/ui'
import type { ButtonVariant, InputTone, Size, ToastTone, TooltipSide } from '@/components/ui'
import {
  BUTTON_VARIANTS,
  EMAIL_INVALID_MESSAGE,
  generateButtonCode,
  generateInputCode,
  generateSelectCode,
  generateTabsCode,
  generateToastCode,
  generateTooltipCode,
  INPUT_TONES,
  isButtonVariant,
  isInputTone,
  isPlaygroundTabValue,
  isSize,
  isToastTone,
  isTooltipSide,
  SELECT_SIZE_OPTIONS,
  SIZES,
  TAB_VALUES,
  TOAST_TONES,
  TOOLTIP_SIDES,
  type PlaygroundTabValue,
} from './playgroundQuery'
import { PlaygroundEmailForm } from './PlaygroundEmailForm'

const playgroundTabItems = [
  { value: 'usage', label: 'Usage', content: 'Pass items with value, label, and content.' },
  { value: 'a11y', label: 'Accessibility', content: 'Arrow keys move between tabs.' },
] as const

/**
 * Interactive playground for Phase 1 primitives: adjust props, read the generated code,
 * see it change live (requirement/forge-requirements.md — Playground route). Client component for
 * the same reason as ButtonDoc — the whole point is live prop manipulation.
 */
export function PlaygroundControls(): JSX.Element {
  const [variant, setVariant] = useState<ButtonVariant>('primary')
  const [size, setSize] = useState<Size>('md')
  const [label, setLabel] = useState('Button')
  const [disabled, setDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [tone, setTone] = useState<InputTone>('neutral')
  const [inputDisabled, setInputDisabled] = useState(false)
  const [showError, setShowError] = useState(false)
  const [toastTone, setToastTone] = useState<ToastTone>('success')
  const [toastTitle, setToastTitle] = useState('Saved')
  const [toastDescription, setToastDescription] = useState('')
  const [selectValue, setSelectValue] = useState('md')
  const [selectDisabled, setSelectDisabled] = useState(false)
  const [tabValue, setTabValue] = useState<PlaygroundTabValue>('usage')
  const [tooltipSide, setTooltipSide] = useState<TooltipSide>('top')
  const [tooltipContent, setTooltipContent] = useState('Copy to clipboard')

  const inputErrorMessage = showError ? EMAIL_INVALID_MESSAGE : undefined

  function handleLabelChange(event: ChangeEvent<HTMLInputElement>): void {
    setLabel(event.target.value)
  }

  function handleVariantChange(event: ChangeEvent<HTMLSelectElement>): void {
    if (isButtonVariant(event.target.value)) {
      setVariant(event.target.value)
    }
  }

  function handleSizeChange(event: ChangeEvent<HTMLSelectElement>): void {
    if (isSize(event.target.value)) {
      setSize(event.target.value)
    }
  }

  function handleToneChange(event: ChangeEvent<HTMLSelectElement>): void {
    if (isInputTone(event.target.value)) {
      setTone(event.target.value)
    }
  }

  function handleToastToneChange(event: ChangeEvent<HTMLSelectElement>): void {
    if (isToastTone(event.target.value)) {
      setToastTone(event.target.value)
    }
  }

  function handleSelectValueChange(value: string): void {
    setSelectValue(value)
  }

  function handleTabValueChange(value: string): void {
    if (isPlaygroundTabValue(value)) {
      setTabValue(value)
    }
  }

  function handleTooltipSideChange(event: ChangeEvent<HTMLSelectElement>): void {
    if (isTooltipSide(event.target.value)) {
      setTooltipSide(event.target.value)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <section aria-labelledby="playground-button-heading">
        <h2 id="playground-button-heading" style={sectionHeadingStyle}>
          Button
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label htmlFor="playground-variant" style={labelStyle}>
                Variant
              </label>
              <select
                id="playground-variant"
                value={variant}
                onChange={handleVariantChange}
                style={fieldStyle}
              >
                {BUTTON_VARIANTS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="playground-size" style={labelStyle}>
                Size
              </label>
              <select id="playground-size" value={size} onChange={handleSizeChange} style={fieldStyle}>
                {SIZES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="playground-label" style={labelStyle}>
                Label
              </label>
              <input
                id="playground-label"
                type="text"
                value={label}
                onChange={handleLabelChange}
                style={fieldStyle}
              />
            </div>

            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(event) => setDisabled(event.target.checked)}
              />
              Disabled
            </label>

            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={isLoading}
                onChange={(event) => setIsLoading(event.target.checked)}
              />
              Loading
            </label>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
              <Dialog
                trigger={<Button variant="secondary">Open dialog demo</Button>}
                title="Delete component?"
                description="This demonstrates Dialog's focus-trap, Escape-to-close, and overlay-click dismissal."
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 220,
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-muted)',
              }}
            >
              <Button variant={variant} size={size} disabled={disabled} isLoading={isLoading}>
                {label}
              </Button>
            </div>

            <pre style={preStyle}>{generateButtonCode({ variant, size, label, disabled, isLoading })}</pre>
          </div>
        </div>
      </section>

      <section aria-labelledby="playground-input-heading">
        <h2 id="playground-input-heading" style={sectionHeadingStyle}>
          Input
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label htmlFor="playground-input-tone" style={labelStyle}>
                Tone
              </label>
              <select
                id="playground-input-tone"
                value={tone}
                onChange={handleToneChange}
                style={fieldStyle}
              >
                {INPUT_TONES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={inputDisabled}
                onChange={(event) => setInputDisabled(event.target.checked)}
              />
              Input disabled
            </label>

            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={showError}
                onChange={(event) => setShowError(event.target.checked)}
              />
              Show error
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 220,
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-muted)',
                padding: 'var(--space-4)',
              }}
            >
              <Input
                aria-label="Preview input"
                placeholder="you@example.com"
                tone={tone}
                disabled={inputDisabled}
                errorMessage={inputErrorMessage}
              />
            </div>

            <pre style={preStyle}>
              {generateInputCode({ tone, disabled: inputDisabled, errorMessage: inputErrorMessage })}
            </pre>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-4)' }}>
          <PlaygroundEmailForm />
        </div>
      </section>

      <section aria-labelledby="playground-toast-heading">
        <h2 id="playground-toast-heading" style={sectionHeadingStyle}>
          Toast
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label htmlFor="playground-toast-tone" style={labelStyle}>
                Toast tone
              </label>
              <select
                id="playground-toast-tone"
                value={toastTone}
                onChange={handleToastToneChange}
                style={fieldStyle}
              >
                {TOAST_TONES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="playground-toast-title" style={labelStyle}>
                Toast title
              </label>
              <input
                id="playground-toast-title"
                type="text"
                value={toastTitle}
                onChange={(event) => setToastTitle(event.target.value)}
                style={fieldStyle}
              />
            </div>

            <div>
              <label htmlFor="playground-toast-description" style={labelStyle}>
                Toast description
              </label>
              <input
                id="playground-toast-description"
                type="text"
                value={toastDescription}
                onChange={(event) => setToastDescription(event.target.value)}
                style={fieldStyle}
              />
            </div>

            <Button
              variant="secondary"
              onClick={() => {
                toast({
                  tone: toastTone,
                  title: toastTitle,
                  description: toastDescription === '' ? undefined : toastDescription,
                })
              }}
            >
              Show toast
            </Button>
          </div>

          <pre style={preStyle}>
            {generateToastCode({
              tone: toastTone,
              title: toastTitle,
              description: toastDescription,
            })}
          </pre>
        </div>
      </section>

      <section aria-labelledby="playground-select-heading">
        <h2 id="playground-select-heading" style={sectionHeadingStyle}>
          Select
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Select
              aria-label="Select size"
              options={SELECT_SIZE_OPTIONS}
              value={selectValue}
              onValueChange={handleSelectValueChange}
              disabled={selectDisabled}
            />
            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={selectDisabled}
                onChange={(event) => setSelectDisabled(event.target.checked)}
              />
              Select disabled
            </label>
          </div>

          <pre style={preStyle}>
            {generateSelectCode({ value: selectValue, disabled: selectDisabled })}
          </pre>
        </div>
      </section>

      <section aria-labelledby="playground-tabs-heading">
        <h2 id="playground-tabs-heading" style={sectionHeadingStyle}>
          Tabs
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--space-6)' }}>
          <div>
            <label htmlFor="playground-tab-value" style={labelStyle}>
              Active tab
            </label>
            <select
              id="playground-tab-value"
              value={tabValue}
              onChange={(event) => handleTabValueChange(event.target.value)}
              style={fieldStyle}
            >
              {TAB_VALUES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Tabs
              aria-label="Playground example"
              items={playgroundTabItems}
              value={tabValue}
              onValueChange={handleTabValueChange}
            />
            <pre style={{ ...preStyle, marginTop: 'var(--space-4)' }}>{generateTabsCode({ value: tabValue })}</pre>
          </div>
        </div>
      </section>

      <section aria-labelledby="playground-tooltip-heading">
        <h2 id="playground-tooltip-heading" style={sectionHeadingStyle}>
          Tooltip
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label htmlFor="playground-tooltip-side" style={labelStyle}>
                Side
              </label>
              <select
                id="playground-tooltip-side"
                value={tooltipSide}
                onChange={handleTooltipSideChange}
                style={fieldStyle}
              >
                {TOOLTIP_SIDES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="playground-tooltip-content" style={labelStyle}>
                Content
              </label>
              <input
                id="playground-tooltip-content"
                type="text"
                value={tooltipContent}
                onChange={(event) => setTooltipContent(event.target.value)}
                style={fieldStyle}
              />
            </div>

            <Tooltip content={tooltipContent} side={tooltipSide} delayDuration={0}>
              <Button variant="secondary">Hover me</Button>
            </Tooltip>
          </div>

          <pre style={preStyle}>
            {generateTooltipCode({ content: tooltipContent, side: tooltipSide })}
          </pre>
        </div>
      </section>
    </div>
  )
}

const sectionHeadingStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'var(--text-lg)',
  fontWeight: 600,
  margin: '0 0 var(--space-4)',
} as const

const labelStyle = {
  display: 'block',
  fontSize: 'var(--text-xs)',
  fontWeight: 500,
  color: 'var(--color-muted-foreground)',
  marginBottom: 6,
} as const

const fieldStyle = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-border)',
  background: 'var(--color-background)',
  color: 'var(--color-foreground)',
  fontSize: 'var(--text-sm)',
  fontFamily: 'var(--font-sans)',
} as const

const preStyle = {
  background: 'var(--color-muted)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  padding: 'var(--space-4)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-sm)',
  color: 'var(--color-foreground)',
  overflowX: 'auto',
  margin: 0,
} as const
