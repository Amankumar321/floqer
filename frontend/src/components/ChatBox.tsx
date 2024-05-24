import React, { useRef, useEffect, useState, BaseSyntheticEvent } from 'react'
import { Flex, Input, Button, Spin } from 'antd'
import './ChatBox.css'

type Chat = {
    sender: 0|1;
    message: string;
    waiting: boolean;
}

const ChatBox: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const scrollBoxRef = useRef<HTMLElement>(null);
    const ChatURL = window.ChatURL ?? "";

    const [chat, setChat] = useState<Chat[]>([{sender: 0, message: "Hello, I'm your AI assistant, how may I help you?", waiting: false}])

    function changeInputHandler(event: BaseSyntheticEvent){
        setMessage(event.target.value);                
    }  

    const sendMessage = () => {

        if (message.length > 0) {
            setChat(v => [...v, {sender: 1, message: message, waiting: false}, {sender: 0, message: "", waiting: true}]);
    
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            };
            fetch(ChatURL, requestOptions)
            .then(res => res.json())
            .then(data => {
                setChat(v => [...(v.filter((value: Chat) => {return value.waiting === false})), {sender: 0, message: data.message, waiting: false}])
            })
            .catch(() => {
                setChat(v => [...(v.filter((value: Chat) => {return value.waiting === false})), {sender: 0, message: "Error making request to server. Try again.", waiting: false}]);
            })

            setMessage("");
        }
    }

    const scrollToEnd = () => {
        if (scrollBoxRef.current instanceof HTMLElement) {
            console.log("scroll")
            scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollToEnd();
    }, [chat])

    return (
        <Flex className='chat-box' vertical={true} gap='small'>
            <Flex className='chat-scroll-box' vertical={true} ref={scrollBoxRef}>
                <Flex vertical={true} gap='middle' style={{ width: '100%' }}>
                    {
                        chat.map((value: Chat, index: number) => {
                            return <ChatMessage key={index} sender={value.sender} message={value.message} waiting={value.waiting} />
                        })
                    }
                </Flex>
            </Flex>
            <Flex vertical={false} gap='small'>
                <Input placeholder="Ask something..." value={message} onChange={changeInputHandler} />
                <Button type='primary' onClick={sendMessage}>Send</Button>
            </Flex>
        </Flex>
    )
}

const ChatMessage: React.FC<Chat> = ({sender, message, waiting}: Chat) => {

    return (
        <Flex className={'chat-message ' + (sender === 0 ? 'chat-message-left' : 'chat-message-right')}>
            {waiting === false ? message : <Spin size='small'></Spin>}
        </Flex>
    )
}

export default ChatBox