# RPL Backend API Test Script
# Questo script testa tutti gli endpoint del backend RPL

Write-Host "🧪 Avvio test del backend RPL..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:4000"
$headers = @{
    "Content-Type" = "application/json"
    "User-Agent" = "RPL-Test-Script/1.0"
}

# Funzione per eseguire test HTTP
function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Url,
        [string]$Description,
        [hashtable]$Body = $null,
        [int]$ExpectedStatus = 200
    )
    
    Write-Host "Testing: $Description" -ForegroundColor Yellow
    Write-Host "  → $Method $Url"
    
    try {
        $response = if ($Body) {
            Invoke-RestMethod -Uri $Url -Method $Method -Headers $headers -Body ($Body | ConvertTo-Json) -StatusCodeVariable statusCode
        } else {
            Invoke-RestMethod -Uri $Url -Method $Method -Headers $headers -StatusCodeVariable statusCode
        }
        
        if ($statusCode -eq $ExpectedStatus) {
            Write-Host "  ✅ Status: $statusCode (Expected: $ExpectedStatus)" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Status: $statusCode (Expected: $ExpectedStatus)" -ForegroundColor Red
        }
        
        Write-Host "  📄 Response:" -ForegroundColor Gray
        $response | ConvertTo-Json -Depth 5 | Write-Host
        Write-Host ""
        
        return $true
    }
    catch {
        Write-Host "  ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        return $false
    }
}

# Test 1: Health Check
Test-Endpoint -Method "GET" -Url "$baseUrl/health" -Description "Health Check" -ExpectedStatus 200

# Test 2: Auth Endpoints (dovrebbero restituire 501 - Not Implemented)
Test-Endpoint -Method "POST" -Url "$baseUrl/api/auth/register" -Description "User Registration" -ExpectedStatus 501
Test-Endpoint -Method "POST" -Url "$baseUrl/api/auth/login" -Description "User Login" -ExpectedStatus 501
Test-Endpoint -Method "POST" -Url "$baseUrl/api/auth/logout" -Description "User Logout" -ExpectedStatus 501
Test-Endpoint -Method "POST" -Url "$baseUrl/api/auth/refresh" -Description "Token Refresh" -ExpectedStatus 501

# Test 3: User Endpoints
Test-Endpoint -Method "GET" -Url "$baseUrl/api/users/profile" -Description "Get User Profile" -ExpectedStatus 501
Test-Endpoint -Method "PUT" -Url "$baseUrl/api/users/profile" -Description "Update User Profile" -ExpectedStatus 501

# Test 4: Restaurant Endpoints
Test-Endpoint -Method "GET" -Url "$baseUrl/api/restaurants" -Description "List Restaurants" -ExpectedStatus 501
Test-Endpoint -Method "POST" -Url "$baseUrl/api/restaurants" -Description "Create Restaurant" -ExpectedStatus 501
Test-Endpoint -Method "GET" -Url "$baseUrl/api/restaurants/123" -Description "Get Restaurant by ID" -ExpectedStatus 501

# Test 5: Worker Endpoints  
Test-Endpoint -Method "GET" -Url "$baseUrl/api/workers/profile" -Description "Get Worker Profile" -ExpectedStatus 501
Test-Endpoint -Method "PUT" -Url "$baseUrl/api/workers/profile" -Description "Update Worker Profile" -ExpectedStatus 501
Test-Endpoint -Method "GET" -Url "$baseUrl/api/workers/jobs" -Description "List Available Jobs" -ExpectedStatus 501

# Test 6: 404 Endpoints (dovrebbero restituire 404)
Test-Endpoint -Method "GET" -Url "$baseUrl/api/nonexistent" -Description "Non-existent API Endpoint" -ExpectedStatus 404
Test-Endpoint -Method "POST" -Url "$baseUrl/api/invalid/route" -Description "Invalid API Route" -ExpectedStatus 404

# Test 7: Rate Limiting (dovrebbe funzionare normalmente)
Write-Host "🚀 Testing Rate Limiting..." -ForegroundColor Cyan
for ($i = 1; $i -le 5; $i++) {
    Write-Host "Request $i/5..."
    Test-Endpoint -Method "GET" -Url "$baseUrl/health" -Description "Rate Limit Test $i" -ExpectedStatus 200
    Start-Sleep -Milliseconds 100
}

Write-Host "🎉 Test completati!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Riepilogo risultati:" -ForegroundColor Cyan
Write-Host "• Health check: Dovrebbe essere 200 (OK)" 
Write-Host "• Auth endpoints: Dovrebbero essere 501 (Not Implemented)"
Write-Host "• User endpoints: Dovrebbero essere 501 (Not Implemented)"
Write-Host "• Restaurant endpoints: Dovrebbero essere 501 (Not Implemented)"
Write-Host "• Worker endpoints: Dovrebbero essere 501 (Not Implemented)"
Write-Host "• Non-existent endpoints: Dovrebbero essere 404 (Not Found)"
Write-Host "• Rate limiting: Dovrebbe funzionare senza errori"