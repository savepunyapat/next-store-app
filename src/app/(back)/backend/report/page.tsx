import React from 'react'
import ReportPage from './Report'
import { Metadata } from 'next'
type Props = {}

export const metadata: Metadata = {
    title: 'Report',
    description: 'Report page description',
    keywords: ['Report', 'Next.js'],
  }

export default function Report({}: Props) {
  return (
    <ReportPage />
  )
}