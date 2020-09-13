function generate({
  angularVersion,
}: {
  angularVersion: 'v6' | 'v7' | 'v8' | 'v9' | 'v10',
}) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title></title>
  <base href="/ng-recaptcha/${angularVersion === 'v10' ? '' : `${angularVersion}/`}">

  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <recaptcha-demo-wrapper></recaptcha-demo-wrapper>
</body>
</html>
`;
}

export const v6 = generate({ angularVersion: 'v6' });
export const v7 = generate({ angularVersion: 'v7' });
export const v8 = generate({ angularVersion: 'v8'  });
export const v9 = generate({ angularVersion: 'v9' });
export const v10 = generate({ angularVersion: 'v10' });
