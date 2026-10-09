$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $root '.tools\demo-video\voice'
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$segments = @(
  @{ Start = 0; Text = 'Welcome to Panta Signal. Here is a quick tour of the live product.' },
  @{ Start = 9; Text = 'Explore questions fetched from Panta, with current market prices and clear status indicators.' },
  @{ Start = 24; Text = 'Open a market to see its full question, phase, and resolution context.' },
  @{ Start = 32; Text = 'The line chart shows observed Panta prices. Switch between yes and no, and change the time range to inspect the history.' },
  @{ Start = 54; Text = 'Read the market criteria and sources before interpreting a price or making a decision.' },
  @{ Start = 68; Text = 'Signal AI can explain the latest available market snapshot, summarize the context, and suggest evidence to check.' },
  @{ Start = 83.5; Text = 'Wallet trading awaits verified Panta on-chain transaction rules.' }
)

$voice = New-Object -ComObject SAPI.SpVoice
$voice.Rate = 0
$voice.Volume = 100

try {
  for ($i = 0; $i -lt $segments.Count; $i++) {
    $path = Join-Path $outputDir ('segment-{0:D2}.wav' -f $i)
    $stream = New-Object -ComObject SAPI.SpFileStream
    try {
      $stream.Open($path, 3, $false)
      $voice.AudioOutputStream = $stream
      [void]$voice.Speak($segments[$i].Text)
    } finally {
      $stream.Close()
      [System.Runtime.InteropServices.Marshal]::ReleaseComObject($stream) | Out-Null
    }
  }
} finally {
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($voice) | Out-Null
}

$segments | ConvertTo-Json | Set-Content -Path (Join-Path $outputDir 'segments.json') -Encoding UTF8
