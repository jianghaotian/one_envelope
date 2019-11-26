import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class BackMenu extends Component {

    render() {
        return (
            <div className='left-con'>
                <div className='left-statistics'>
                    <div>
                        <i className="iconfont icontongji" style={{marginLeft:30}}></i>
                        <span style={{marginLeft:20}}>统计</span>
                    </div>
                    <div className='left-analy'>
                        <Link to='/buseranaly' >用户分析</Link>
                        <Link to='/bletteranaly'>信件分析</Link>
                    </div>
                </div>
                <div className='left-manage'>
                    <div style={{marginTop:10}}>
                        <i className="iconfont iconweibiaoti5" style={{marginLeft:30}}></i>
                        <span style={{marginLeft:20}}>管理</span>
                    </div>
                    <div className='left-analy'>
                        <Link to='/busermanage'>用户管理</Link>
                        <Link to='blettermanage'>信件管理</Link>
                        <Link to='bpapermanage'>信纸管理</Link>
                    </div>
                </div>
            </div>
        )
    }
}
