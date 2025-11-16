export function generateOTPEmailTemplate(otp: string): string {
  return `
<!doctype html>
<html>
  <body>
    <div
      style='background-color:#0b042c;color:#FFFFFF;font-family:Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#1d0f5c;border-radius:20px"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <div style="height:80px"></div>
              
              <div
                style="color:#ffffff;font-size:16px;font-weight:normal;text-align:center;padding:16px 24px 16px 24px"
              >
                Here is your one-time passcode:
              </div>
              <h1
                style='font-weight:bold;text-align:center;margin:0;font-family:Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif;font-size:32px;padding:16px 24px 16px 24px'
              >
                ${otp}
              </h1>
              <div
                style="color:#868686;font-size:16px;font-weight:normal;text-align:center;padding:16px 24px 0px 24px"
              >
                This code will expire in 05 minutes.
              </div>
              <div
                style="color:#868686;font-size:16px;font-weight:normal;text-align:center;padding:0px 24px 16px 24px"
              >
                Enter it on the verification page to complete your registration.
              </div>
              <div style="height:80px"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`;
}
