import React, { useState } from 'react'
import '../style.css'

import Display from '../display/display'
import Button from '../button/button'

function Kalkulator(){
        //States para o Display
        const [nomerDisplay1, setNomerDisplay1] = useState('')
        const [nomerDisplay2, setNomerDisplay2] = useState('')
        const [operatorKal, setOperatorKal] = useState('') 
        const [hasilPen, setHasilPen] = useState('')
    
        // States usados para verificar situações
        const [operator, setOperator] = useState(false)
        const [operator2, setOperator2] = useState(true)
        const [firstClick, setFirstClick] = useState(false)
        const [hitungFirst, setHitungFirst] = useState(false)
    
        // State que recebe o Primeiro valor, o operador, o segundo valor e faz a operação
        // 'ultimoNumero' é o resultado da ultima operação
        const [calculo, setCalculo] = useState({
            'firstNum': '',
            'operator': '',
            'secondNum': '',
            'lastNum': ''
        })

        // Função para receber os valores pra exibir no Display e guardar no state Calculo
        const terimaNilai = (num) => {
            if(operator === false){
                // Esse IF vai verificar se ja tiver um resultado na tela e clicar em um número, ele vai limpar e colocar o numero digitado
                if(hitungFirst){
                    clearValues(num, true)
                    setHitungFirst(false)
                }if( num === '.'){
                    // Adicionando ponto para valor Float
                    calculo.firstNum += num
                    setNomerDisplay1(nomerDisplay1 + num)
                    calculo.lastNum = ''
                    }else if (num === 'backspace'){
                    // Exclui o último valor da chave 'primeiroNum' do state calculo
                    setCalculo({ 
                        'firstNum': calculo.firstNum.slice(0, -1),
                        'operator': '',
                        'secondNum': ''
                    })
                    setNomerDisplay1(nomerDisplay1)   
                }else{ 
                    // Adiciona o numero na tela/objeto
                    calculo.firstNum += num
                    setNomerDisplay1(nomerDisplay1 + num)
                    calculo.lastNum = ''
                }
            }else{
                if (num === '.'){
                    // Adicionando ponto para valor Float
                    calculo.secondNum += num
                    setNomerDisplay2(nomerDisplay2 + num)
                }else if(num === 'backspace'){
                    // Exclui o último valor da chave 'segundoNum' do state calculo e mantem os outros
                    setCalculo({
                        'firstNum': calculo.firstNum,
                        'operator': calculo.operator,
                        'secondNum': calculo.secondNum.slice(0, -1),
                    })
                }else{
                    // Adiciona o numero na tela/objeto
                    calculo.secondNum += num
                    setNomerDisplay2(nomerDisplay2 + num)
                }
            }
        }

        // Função para receber o operador clicado
        const acceptOperator = (num) => {
            calculo['operator'] = num
            setOperatorKal(num)
            setOperator(true)
            setOperator2(false)
    
            // Verifica se ja houve o primeiro clique no '=', se tiver, ele vai adicionar o ultimo numero e a operação
            // para fazer outro cálculo.
            if(firstClick){
                setCalculo({
                'firstNum': calculo.lastNum,
                'operator': calculo.operator,
                'secondNum': '',
                })
                setNomerDisplay1(calculo.lastNum)
                setNomerDisplay2('')   
            }

            setFirstClick(true)
        }

        // Função para fazer o calculo com os valores recebidos
        const Operasi = (num) => {
            // Objeto com as funções respectivas de cada tipo de operação
            const operasi = {
                '+': (num1, num2) => (parseFloat(num1) + parseFloat(num2)),
                '-': (num1, num2) => (parseFloat(num1) - parseFloat(num2)),
                '/': (num1, num2) => (parseFloat(num1) / parseFloat(num2)),
                '%': (num1, num2) => (parseFloat(num1) % parseFloat(num2)),
                '*': (num1, num2) => (parseFloat(num1) * parseFloat(num2)),
            }
            
            // Jogando o resultado da operação na tela
            let result = operasi[calculo['operator']](calculo.firstNum, calculo.secondNum)
            calculo.lastNum = result
            setHasilPen(result)

            // Ajustando os states de verificação
            setOperator2(true)
            setOperator(false)
            setHitungFirst(true)
        }

        // Função para limpar o display e valores do objeto, para a próxima operação
        const clearValues = (num, hitung) => {
            // Esse IF vai verificar se ja tiver um resultado na tela e clicar em um número, ele vai limpar e colocar o numero digitado
            if(hitung){ 
                setCalculo({
                    'firstNum': num,
                    'operator': calculo.operator,
                    'secondNum': '',  
                })

                setFirstClick(false)
                setHasilPen('')
                setNomerDisplay1('')
                setNomerDisplay2('')
                setOperatorKal('')
            }else{
                setCalculo({
                    'firstNum': '',
                    'operator': calculo.operator,
                    'secondNum': '',  
                })
    
                setFirstClick(false)
                setHasilPen('')
                setNomerDisplay1('')
                setNomerDisplay2('')
                setOperatorKal('')
            }
        }
        
        // Função para mostrar mensagem de erro
        const showError = () => {
            setHasilPen('0')
        }
     
        // Função geral responsavel por suportar as outras funções e fazer as verificações necessárias para executar cada função de acordo com o clique do botão
        const calcula = (num) => {
            if (!isNaN(num) || num === '.' || num === 'backspace'){
                terimaNilai(num)
            }else if ((num === '+' || num === '-' || num === '/' || num === '*' || num === '%') & operator2){
                acceptOperator(num)
            }else if(num === 'C'){
                clearValues()
            }else if(num === '='){
                if(calculo.secondNum !== ''){
                    Operasi(num)
                }else{
                    showError()
                }
            }
        }
    
    return(
        
        <section className = 'kalkulator'>
            <Display
                hasil = {hasilPen} 
                nomer1 = {calculo.firstNum}
                nomer2 = {calculo.secondNum}
                operator = {operatorKal}
            />
            <Button calcula = {calcula} />
      </section>
    )
}

export default Kalkulator