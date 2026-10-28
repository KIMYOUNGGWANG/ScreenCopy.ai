import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(to: string) {
  try {
    await resend.emails.send({
      from: 'ScreenCopy.ai <onboarding@screencopy.ai>', // Replace with your verified domain
      to: [to],
      subject: 'ScreenCopy.ai에 오신 것을 환영합니다!',
      html: `
        <h1>ScreenCopy.ai에 오신 것을 환영합니다!</h1>
        <p>저희 서비스를 이용해주셔서 감사합니다. 이제 AI의 힘으로 앱스토어 스크린샷 카피를 10초 만에 생성할 수 있습니다.</p>
        <p>지금 바로 스튜디오에서 첫 카피를 생성해보세요: <a href="${process.env.NEXT_PUBLIC_APP_URL}/studio">스튜디오 바로가기</a></p>
        <p>궁금한 점이 있으시면 언제든지 문의해주세요.</p>
        <p>감사합니다,<br/>ScreenCopy.ai 팀 드림</p>
      `,
    })
    console.log(`Welcome email sent to ${to}`)
  } catch (error) {
    console.error(`Failed to send welcome email to ${to}:`, error)
  }
}

export async function sendPaymentReceiptEmail(to: string, amount: number, credits: number, transactionId: string) {
  try {
    await resend.emails.send({
      from: 'ScreenCopy.ai <noreply@screencopy.ai>', // Replace with your verified domain
      to: [to],
      subject: 'ScreenCopy.ai 크레딧 구매 영수증',
      html: `
        <h1>크레딧 구매가 완료되었습니다!</h1>
        <p>ScreenCopy.ai에서 크레딧을 구매해주셔서 감사합니다.</p>
        <ul>
          <li>구매 금액: $${amount.toFixed(2)}</li>
          <li>추가된 크레딧: ${credits}</li>
          <li>거래 ID: ${transactionId}</li>
        </ul>
        <p>현재 남은 크레딧은 계정 페이지에서 확인하실 수 있습니다: <a href="${process.env.NEXT_PUBLIC_APP_URL}/account">계정 페이지 바로가기</a></p>
        <p>감사합니다,<br/>ScreenCopy.ai 팀 드림</p>
      `,
    })
    console.log(`Payment receipt email sent to ${to} for transaction ${transactionId}`)
  } catch (error) {
    console.error(`Failed to send payment receipt email to ${to}:`, error)
  }
}
