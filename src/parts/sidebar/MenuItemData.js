import {AiOutlineDashboard} from 'react-icons/ai'
import {BsBarChart} from 'react-icons/bs'
import {AiOutlineSetting} from 'react-icons/ai'
import {RiProjectorLine} from 'react-icons/ri'
import {CgListTree} from 'react-icons/cg'
import {IoMdArrowDropdown} from 'react-icons/io';
import {IoMdArrowDropup} from 'react-icons/io'
import React from 'react';

export const menuItemList = [
    {
        title: 'Dashboard',
        path:'/dashboard',
        icon: <AiOutlineDashboard/>
    },
    {
        title: 'Visualize',
        path:'/visualize',
        icon: <BsBarChart/>,
        dropdownOpened: <IoMdArrowDropup/>,
        dropdownClosed: <IoMdArrowDropdown/>,
        subItems: [
            {
                title: 'Define',
                path: '/define',
                icon: <CgListTree/>
            },
            {
                title: 'Calibrate',
                path: '/calibrate',
                icon: <CgListTree/>
            },
            {
                title: 'Evaluate',
                path: '/evaluate',
                icon: <CgListTree/>
            },
            {
                title: 'Assess',
                path: '/assess',
                icon: <CgListTree/>
            },
        ]    
    },
    {
        title: 'Projects',
        path:'/projects',
        icon: <RiProjectorLine/>
    },
    {
        title: 'Settings',
        path:'/settings',
        icon: <AiOutlineSetting/>
    }
]