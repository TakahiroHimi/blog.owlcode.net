---
created: '2020-12-05'
updated: ''
title: StripeElementsのエラーをReactHookFormでvalidationしたい
visual: 'React'
tags: ['React', 'Stripe']
---

## やりたいこと

`form`内に`ReactHookForm`でvalidationする`input`と`StripeElements`が混在している場合に、`Submit`や`Blur`のタイミングで`StripeElements`の入力内容も検証して、エラーがあれば他`input`と同様のフォーマットで表示したい。  
イメージとしては以下のような感じ。  
![no-style](https://raw.githubusercontent.com/TakahiroHimi/blog.owlcode.net/main/src/posts/20211205-stripe-elements/form-validate.gif)  

複数画面で使うことも考慮して**ReactHookFormでvalidation可能なStripeElements**をコンポーネントとして作成して使いまわせるようにしたい。  

&nbsp;

## 完成形

ReactHookFormの`useFormContext`を利用すると良い感じに実装できる。  
<https://react-hook-form.com/api/useformcontext>

```tsx
// CreditCardInput.tsx(カード情報入力コンポーネントのView部分)
import { CardElement } from '@stripe/react-stripe-js'
import React, { VFC } from 'react'
import { useCreditCardInput } from './useCreditCardInput'

const CreditCardInput: VFC = () => {
  const { onChange, onBlur } = useCreditCardInput()

  return <CardElement onChange={onChange} onBlur={onBlur} options={stripeElementOptions} />
}

export default CreditCardInput
```

```ts
// useCreditCardInput.ts(ロジック部分)
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRef } from 'react'
import { useController, useFormContext } from 'react-hook-form'

export const useCreditCardInput = () => {
  const cardError = useRef<string | undefined>(undefined)
  const elements = useElements()
  const stripe = useStripe()

  const { control, setValue, trigger } = useFormContext<{ creditCard: unknown }>()
  const {
    field: { onChange, onBlur },
  } = useController({
    control: control,
    name: 'creditCard',
    rules: {
      required: '入力してください。',
      validate: () => {
        return cardError.current
      },
    },
  })

  // CardElementのChange, Blur時にvalidate処理を設定
  elements?.getElement(CardElement)?.on('change', (event) => {
    cardError.current = event.error?.message

    if (!event.empty) {
      setValue('creditCard', true)
    } else {
      setValue('creditCard', null)
    }
  })
  elements?.getElement(CardElement)?.on('blur', () => {
    trigger('creditCard')
  })

  return {
    elements,
    stripe,
    onChange,
    onBlur,
  }
}
```

***

```tsx
// CreditCardForm.tsx(フォームのView部分)
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CreditCardInput, NameInput, MailInput } from './'

const stripePromise = loadStripe('XXXXXXXXXXXXXXXXXX')

const CreditCardFormWrapper: VFC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CreditCardForm />
    </Elements>
  )
}

export const CreditCardForm: VFC = () => {
  const { onSubmit, methods } = useCreditCardForm()
  const errors = methods.formState.errors

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <NameInput
          {...methods.register('name', { required: '入力してください' })}
        />
        <p>{errors.name?.message}</p>
        <MailInput
          {...methods.register('mail', { required: '入力してください' })}
        />
        <p>{errors.mail?.message}</p>
        <CreditCardInput />
        <p>{errors.creditCard?.message}</p>
      </form>
    </FormProvider>
  )
}

export default CreditCardFormWrapper
```

```tsx
// useCreditCardForm.ts(ロジック部分)
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

export const useCreditCardForm = () => {
  const methods = useForm<{name: string, mail: string, creditCard: unknown }>()
  const elements = useElements()
  const stripe = useStripe()

  const onSubmit = methods.handleSubmit(async () => {
    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) return

    const result = await stripe.createToken(cardElement)

    if (result.error || !result.token.card) {
      const errorMessage = result.error?.message || 'クレジットカードの登録に失敗しました。'
      methods.setError('creditCard', { type: 'validate', message: errorMessage }) // 👈setErrorでトークン作成時に発生したエラーを設定する
    }
  })

  return {
    methods,
    onSubmit,
  }
}
```

&nbsp;

## End

業務で作成する必要が出たので作った。  
`StripeElements`も`ReactHookForm`も有名ライブラリなので、この組み合わせで使ってる人の記事から真似して楽できるかな〜と思ってたら全く実装例が見つからず、自分で実装検討した。  
どちらのライブラリもドキュメントが丁寧でありがたい。  
今のとこ良い感じだけど、もしもっと筋の良いやり方があれば知りたい。  
