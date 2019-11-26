import React from 'react';
import {Link} from 'react-router-dom'
import '../css/Back.css'
export default function Header(){
    return (
        <div className='header'>
            <header>
                <img src={require('../image/yifeng.jpg')} alt='' className='top-logo' />
                <span className='top-font'>一封管理平台</span>
                <div>
                    <img src={require('../image/avatar.png')} alt='' className='top-avatar'/>
                    <span className='top-admin'>用户名</span>
                    <i className="iconfont icontuichu" id='top-exit'></i>
                    <Link>退出</Link>
                </div>
            </header>
        </div>
    )
}