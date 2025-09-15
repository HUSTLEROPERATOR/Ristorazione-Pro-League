# RPL Authentication Test Script
# Test degli endpoint di autenticazione del backend RPL

Write-Host "🔐 Test del sistema di autenticazione RPL..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:4000"
$headers = @{
    "Content-Type" = "application/json"
    "User-Agent" = "RPL-Auth-Test/1.0"
}

# Test user data
$testUser = @{
    email = "test@rpl.com"
    password = "TestPassword123!"
    firstName = "Mario"
    lastName = "Rossi"
    role = "USER"
} | ConvertTo-Json

$loginData = @{
    email = "test@rpl.com"
    password = "TestPassword123!"
} | ConvertTo-Json

function Test-AuthEndpoint {
    param(
        [string]$Method,
        [string]$Url,
        [string]$Description,
        [string]$Body = $null,
        [hashtable]$AuthHeaders = $null,
        [int]$ExpectedStatus = 200
    )
    
    Write-Host "🔍 Testing: $Description" -ForegroundColor Yellow
    Write-Host "  → $Method $Url"
    
    try {
        $requestHeaders = $headers.Clone()
        if ($AuthHeaders) {
            $AuthHeaders.Keys | ForEach-Object { $requestHeaders[$_] = $AuthHeaders[$_] }
        }
        
        $response = if ($Body) {
            Invoke-RestMethod -Uri $Url -Method $Method -Headers $requestHeaders -Body $Body -StatusCodeVariable statusCode
        } else {
            Invoke-RestMethod -Uri $Url -Method $Method -Headers $requestHeaders -StatusCodeVariable statusCode
        }
        
        if ($statusCode -eq $ExpectedStatus) {
            Write-Host "  ✅ Status: $statusCode (Expected: $ExpectedStatus)" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Status: $statusCode (Expected: $ExpectedStatus)" -ForegroundColor Red
        }
        
        Write-Host "  📄 Response:" -ForegroundColor Gray
        $response | ConvertTo-Json -Depth 5 | Write-Host
        Write-Host ""
        
        return $response
    }
    catch {
        $errorMessage = $_.Exception.Message
        $errorResponse = $_.ErrorDetails.Message
        
        Write-Host "  ❌ Error: $errorMessage" -ForegroundColor Red
        if ($errorResponse) {
            Write-Host "  📄 Error Response:" -ForegroundColor Gray
            $errorResponse | Write-Host
        }
        Write-Host ""
        return $null
    }
}

# Test 1: Health Check
Write-Host "=== HEALTH CHECK ===" -ForegroundColor Magenta
Test-AuthEndpoint -Method "GET" -Url "$baseUrl/health" -Description "Server Health" -ExpectedStatus 200

# Test 2: User Registration
Write-Host "=== USER REGISTRATION ===" -ForegroundColor Magenta
$registrationResult = Test-AuthEndpoint -Method "POST" -Url "$baseUrl/api/auth/register" -Description "User Registration" -Body $testUser -ExpectedStatus 201

# Extract tokens if registration successful
$accessToken = $null
$refreshToken = $null
if ($registrationResult -and $registrationResult.success) {
    $accessToken = $registrationResult.data.tokens.accessToken
    $refreshToken = $registrationResult.data.tokens.refreshToken
    Write-Host "🔑 Access token obtained: $($accessToken.Substring(0,20))..." -ForegroundColor Green
}

# Test 3: User Login (should work even if registration fails due to existing user)
Write-Host "=== USER LOGIN ===" -ForegroundColor Magenta
$loginResult = Test-AuthEndpoint -Method "POST" -Url "$baseUrl/api/auth/login" -Description "User Login" -Body $loginData -ExpectedStatus 200

# Extract tokens from login if registration didn't work
if ($loginResult -and $loginResult.success -and !$accessToken) {
    $accessToken = $loginResult.data.tokens.accessToken
    $refreshToken = $loginResult.data.tokens.refreshToken
    Write-Host "🔑 Access token from login: $($accessToken.Substring(0,20))..." -ForegroundColor Green
}

# Test 4: Get Profile (Protected Route)
if ($accessToken) {
    Write-Host "=== PROTECTED ROUTES ===" -ForegroundColor Magenta
    $authHeaders = @{ "Authorization" = "Bearer $accessToken" }
    Test-AuthEndpoint -Method "GET" -Url "$baseUrl/api/auth/profile" -Description "Get User Profile" -AuthHeaders $authHeaders -ExpectedStatus 200
}

# Test 5: Refresh Token
if ($refreshToken) {
    Write-Host "=== TOKEN REFRESH ===" -ForegroundColor Magenta
    $refreshData = @{ refreshToken = $refreshToken } | ConvertTo-Json
    Test-AuthEndpoint -Method "POST" -Url "$baseUrl/api/auth/refresh" -Description "Refresh Token" -Body $refreshData -ExpectedStatus 200
}

# Test 6: Logout
if ($accessToken) {
    Write-Host "=== USER LOGOUT ===" -ForegroundColor Magenta
    $authHeaders = @{ "Authorization" = "Bearer $accessToken" }
    Test-AuthEndpoint -Method "POST" -Url "$baseUrl/api/auth/logout" -Description "User Logout" -AuthHeaders $authHeaders -ExpectedStatus 200
}

# Test 7: Invalid Authentication
Write-Host "=== INVALID AUTHENTICATION TESTS ===" -ForegroundColor Magenta
$invalidAuthHeaders = @{ "Authorization" = "Bearer invalid_token" }
Test-AuthEndpoint -Method "GET" -Url "$baseUrl/api/auth/profile" -Description "Invalid Token Test" -AuthHeaders $invalidAuthHeaders -ExpectedStatus 401

# Test 8: Missing Authentication
Test-AuthEndpoint -Method "GET" -Url "$baseUrl/api/users/profile" -Description "Missing Auth Test" -ExpectedStatus 401

Write-Host "🎉 Test autenticazione completati!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Riepilogo risultati attesi:" -ForegroundColor Cyan
Write-Host "• Registration: 201 (Created) oppure 409 (User already exists)"
Write-Host "• Login: 200 (OK)"
Write-Host "• Profile: 200 (OK) con token valido"
Write-Host "• Refresh: 200 (OK) con refresh token valido"
Write-Host "• Logout: 200 (OK)"
Write-Host "• Invalid token: 401 (Unauthorized)"
Write-Host "• Missing auth: 401 (Unauthorized)"