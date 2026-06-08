import TopSlider from '@/components/TopSlider'
import React from 'react'
import PaymentContent from './PaymentContent'

const PaymentHome = () => {
    return (
        <>
            <TopSlider
                slides={[
                    'Review your selections, shipping, and payment details.',
                    'Your wellness essentials are ready for delivery.'
                ]}
            />
            <PaymentContent />
        </>
    )
}

export default PaymentHome