import { useState, useEffect } from 'react'

function App() {
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState({
    rua: '',
    bairro: '',
    cidade: '',
    estado: ''
  })
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  // Aplica máscara de CEP (XXXXX-XXX)
  const formatarCep = (valor) => {
    const numeros = valor.replace(/\D/g, '')
    if (numeros.length <= 5) {
      return numeros
    }
    return `${numeros.slice(0, 5)}-${numeros.slice(5, 8)}`
  }

  const handleCepChange = (e) => {
    const valorFormatado = formatarCep(e.target.value)
    setCep(valorFormatado)
    setErro('')
    setSucesso('')
  }

  // Busca CEP na API ViaCEP
  const buscarCep = async (cepParaBuscar) => {
    const cepLimpo = cepParaBuscar.replace(/\D/g, '')

    if (cepLimpo.length !== 8) {
      return
    }

    setLoading(true)
    setErro('')
    setSucesso('')

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const data = await response.json()

      if (data.erro) {
        setErro('CEP não encontrado. Verifique o número digitado.')
        setEndereco({
          rua: '',
          bairro: '',
          cidade: '',
          estado: ''
        })
        return
      }

      setEndereco({
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || ''
      })
      setSucesso('Endereço encontrado com sucesso!')
      
    } catch (error) {
      setErro('Erro ao buscar CEP. Tente novamente.')
      console.error('Erro ao buscar CEP:', error)
    } finally {
      setLoading(false)
    }
  }

  // Dispara busca automaticamente após 8 dígitos
  useEffect(() => {
    const cepLimpo = cep.replace(/\D/g, '')
    
    if (cepLimpo.length === 8) {
      const timeoutId = setTimeout(() => {
        buscarCep(cep)
      }, 500)
      
      return () => clearTimeout(timeoutId)
    }
  }, [cep])

  return (
    <div className="container">
      <header className="header">
        <h1>🔍 Buscador de CEP</h1>
        <p>Digite o CEP para buscar o endereço automaticamente</p>
      </header>

      <div className="card">
        {erro && (
          <div className="error-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>{erro}</p>
          </div>
        )}

        {sucesso && !loading && (
          <div className="success-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p>{sucesso}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="cep">CEP</label>
          <input
            id="cep"
            type="text"
            className="input-cep"
            placeholder="00000-000"
            value={cep}
            onChange={handleCepChange}
            maxLength={9}
          />
        </div>

        {loading ? (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <span className="loading-text">Buscando endereço...</span>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="rua">Rua</label>
              <input
                id="rua"
                type="text"
                placeholder="Rua, Avenida, etc."
                value={endereco.rua}
                disabled
              />
            </div>

            <div className="address-grid">
              <div className="form-group">
                <label htmlFor="bairro">Bairro</label>
                <input
                  id="bairro"
                  type="text"
                  placeholder="Bairro"
                  value={endereco.bairro}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <input
                  id="estado"
                  type="text"
                  placeholder="UF"
                  value={endereco.estado}
                  disabled
                />
              </div>
            </div>

            <div className="form-group address-full">
              <label htmlFor="cidade">Cidade</label>
              <input
                id="cidade"
                type="text"
                placeholder="Cidade"
                value={endereco.cidade}
                disabled
              />
            </div>
          </>
        )}

        <div className="api-info">
          <p>
            Dados fornecidos por <a href="https://viacep.com.br" target="_blank" rel="noopener noreferrer">ViaCEP API</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

