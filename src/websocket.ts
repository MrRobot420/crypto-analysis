import WebSocket from 'ws'

const initWebSocketClient = (url: string): WebSocket => {
    return new WebSocket(url, { perMessageDeflate: false })
}

const manageWebSocket = (ws: WebSocket, currency: string) => {
    ws.on('open', function open() {
        console.log(`opened ${currency} connection\n`)
        ws.send(JSON.stringify({
            "event": "bts:subscribe",
            "data": {
                "channel": `live_trades_${currency}`
            }
        }))
    })
    
    ws.on('message', function incoming(receivedData) {
        const tradeData: TradeData = JSON.parse(receivedData.toString())
        const { data } = tradeData
        
        if (tradeData.event === 'trade') {
            console.log(`${currency.split('eur')[0].toUpperCase()} Price: \t${data.price} €`)
        }
    })
}

type TradeData = {
    data: {
        buy_order_id: number,
        amount_str: string,
        timestamp: string,
        microtimestamp: string,
        id: number,
        amount: number,
        sell_order_id: number,
        price_str: string,
        type: number,
        price: number
    },
    event: string,
    channel: string
}

export { 
    initWebSocketClient,
    manageWebSocket
}