$targetDir = "C:\Users\rusla\Downloads\top anime project\astro-project\public\images\ln"

function Get-WikiCoverUrl {
    param([string]$PageTitle)
    try {
        # Use Wikipedia API to get the page image
        $api = "https://en.wikipedia.org/w/api.php"
        $query = "action=query&titles=$([System.Uri]::EscapeDataString($PageTitle))&prop=pageimages&format=json&pithumbsize=800"
        $result = Invoke-RestMethod -Uri "$api`?$query" -ErrorAction Stop
        $pages = $result.query.pages
        $firstKey = ($pages.PSObject.Properties | Select-Object -First 1).Name
        if ($firstKey -ne "-1" -and $pages.$firstKey.thumbnail) {
            return $pages.$firstKey.thumbnail.source
        }
    } catch {
        return $null
    }
    return $null
}

function Save-Img {
    param($Url, $Path)
    try {
        Write-Host "  Downloading: $Url"
        Invoke-WebRequest -Uri $Url -OutFile $Path -ErrorAction Stop
        $len = (Get-Item $Path).Length
        if ($len -gt 1000) {
            Write-Host "  OK ($len bytes)" -ForegroundColor Green
            return $true
        }
        Write-Host "  Too small ($len bytes)" -ForegroundColor Yellow
        return $false
    } catch {
        Write-Host "  FAILED: $_" -ForegroundColor Red
        return $false
    }
}

$images = @(
    @{num=1;  url="https://static.wikia.nocookie.net/isekai-smartphone/images/e/e1/IsesumaLNV1.jpg"; wiki="In Another World with My Smartphone"},
    @{num=2;  url="https://static.wikia.nocookie.net/averageabilities/images/2/21/Light_Novel_Volume_1_Cover_%28JP%29.jpg"; wiki="Didn't I Say to Make My Abilities Average in the Next Life?!"},
    @{num=3;  url="https://static.wikia.nocookie.net/arifureta-shokugyou-de-sekai-saikyou/images/b/b0/Arifureta-LN-JP-Cover-v01.png"; wiki="Arifureta"},
    @{num=4;  url="https://static.wikia.nocookie.net/isekai-maou-to-shoukan-shoujo-dorei-majutstu/images/7/74/Isekai_maou_to_shoukan_shoujo_no_dorei_majutsu_volume_1.jpg"; wiki="How Not to Summon a Demon Lord"},
    @{num=5;  url="https://static.wikia.nocookie.net/slave-harem/images/5/5c/Light_Novel_-_Volume_1.jpg"; wiki=$null},
    @{num=6;  url="https://static.wikia.nocookie.net/kumakumakumabear/images/c/cd/Kuma_Kuma_Kuma_Bear_Light_Novel_Volume_01.jpg"; wiki="Kuma Kuma Kuma Bear"},
    @{num=7;  url="https://static.wikia.nocookie.net/sentenced-to-be-a-hero/images/b/ba/JP_Light_Novel_-_Volume_1.png"; wiki=$null},
    @{num=8;  url="https://static.wikia.nocookie.net/slime-taoshite-300-nen/images/9/94/Light_Novel_Volume_1_cover.jpg"; wiki="I've Been Killing Slimes for 300 Years and Maxed Out My Level"},
    @{num=9;  url="https://static.wikia.nocookie.net/konosuba/images/e/e5/Konosuba_Volume_1_Cover.jpg"; wiki="KonoSuba"},
    @{num=10; url="https://static.wikia.nocookie.net/akuyaku-reijou-level-99/images/0/06/Volume_1_Cover.jpg"; wiki="Villainess Level 99"},
    @{num=11; url="https://static.wikia.nocookie.net/mushokutensei/images/6/68/LN_Vol_1_JP.jpg"; wiki="Mushoku Tensei"},
    @{num=12; url="https://img.sos-dan.net/1080/01K/G/9/E1Q219HC6YH1P3SR2NM57.jpg"; wiki="Farming Life in Another World"},
    @{num=13; url="https://static.wikia.nocookie.net/jitsu-wa-ore-saikyou-deshita/images/5/5e/Novel_Volume_1_JP.jpg"; wiki=$null},
    @{num=14; url="https://static.wikia.nocookie.net/chillin-life-of-the-exbrave-hero-candidate/images/b/ba/LN1.jpeg"; wiki="Chillin' in Another World with Level 2 Super Cheat Powers"},
    @{num=15; url="https://static.wikia.nocookie.net/blacksummoner/images/d/d3/Light_Novel_Volume_1_Color_1.jpg"; wiki="Black Summoner"},
    @{num=16; url="https://static.wikia.nocookie.net/i20became20the20strongest20with20the20failure20framee38/images/6/67/Light_Novel_01_-_Cover1.png"; wiki="Failure Frame"},
    @{num=17; url="https://static.wikia.nocookie.net/uchimusume/images/b/b7/UchiMusume_Novel_V01.jpg"; wiki="If It's for My Daughter, I'd Even Defeat a Demon Lord"},
    @{num=18; url="https://static.wikia.nocookie.net/yasei-no-last-boss-arawareta/images/8/86/V1_Cover.jpg"; wiki="A Wild Last Boss Appeared!"},
    @{num=19; url="https://static.wikia.nocookie.net/mamahaha-no-tsurego-ga-motokano-datta/images/3/3e/Light_Novel_Volume_1_Cover.webp"; wiki="My Step Sister is My Ex-Girlfriend"},
    @{num=20; url="https://static.wikia.nocookie.net/gimai-seikatsu/images/b/b3/V1_01.png"; wiki="Days with My Stepsister"}
)

foreach ($img in $images) {
    $num = $img.num.ToString("00")
    $outPath = Join-Path $targetDir "ln$num.jpg"
    
    if (Test-Path $outPath) {
        Write-Host "ln$num.jpg exists ($((Get-Item $outPath).Length) bytes)" -ForegroundColor Cyan
        continue
    }
    
    Write-Host "Processing ln$num.jpg..." -ForegroundColor White
    $saved = $false
    
    # Try direct URL
    if ($img.url) {
        $saved = Save-Img -Url $img.url -Path $outPath
    }
    
    # Try Wikipedia API
    if (-not $saved -and $img.wiki) {
        Write-Host "  Searching Wikipedia for: $($img.wiki)" -ForegroundColor Yellow
        $wikiUrl = Get-WikiCoverUrl -PageTitle $img.wiki
        if ($wikiUrl) {
            $saved = Save-Img -Url $wikiUrl -Path $outPath
        } else {
            Write-Host "  No Wikipedia image found" -ForegroundColor Yellow
        }
    }
    
    if (-not $saved) {
        Write-Host "  MISSING - no source for ln$num.jpg" -ForegroundColor Red
    }
}

Write-Host "`n=== RESULTS ===" -ForegroundColor Cyan
$ok = 0; $miss = 0
for ($i = 1; $i -le 20; $i++) {
    $p = Join-Path $targetDir "ln$($i.ToString('00')).jpg"
    if (Test-Path $p) { $ok++; Write-Host "ln$($i.ToString('00')).jpg - OK ($((Get-Item $p).Length) bytes)" -ForegroundColor Green }
    else { $miss++; Write-Host "ln$($i.ToString('00')).jpg - MISSING" -ForegroundColor Red }
}
Write-Host "`n$ok/20 downloaded, $miss missing" -ForegroundColor Cyan
