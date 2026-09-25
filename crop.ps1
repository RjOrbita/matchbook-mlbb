Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("uec-logo.png")
$minX = $bmp.Width; $minY = $bmp.Height; $maxX = 0; $maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$newWidth = $maxX - $minX + 1
$newHeight = $maxY - $minY + 1

if ($newWidth -gt 0 -and $newHeight -gt 0) {
    $rect = New-Object System.Drawing.Rectangle($minX, $minY, $newWidth, $newHeight)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $bmp.Dispose()
    $cropped.Save("uec-logo-cropped.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Host "Cropped to $newWidth x $newHeight"
} else {
    $bmp.Dispose()
    Write-Host "No visible pixels found."
}
