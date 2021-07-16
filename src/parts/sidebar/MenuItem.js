import {AiOutlineDashboard} from 'react-icons/ai'
import {BsBarChart} from 'react-icons/bs'
import {AiOutlineSetting} from 'react-icons/ai'
import {RiProjectorLine} from 'react-icons/ri'
import {CgListTree} from 'react-icons/cg'
import React from 'react';

export const MenuItemList = [
    {
        title: 'Dashboard',
        path:'/dashboard',
        icon: <AiOutlineDashboard/>
    },
    {
        title: 'Visualize',
        path:'/visualize',
        icon: <BsBarChart/>,
        subItems: [
            {
                title: 'Define',
                path: '/piquetree',
                icon: <CgListTree/>
            },
            {
                title: 'Calibrate',
                path: '/piquetree',
                icon: <CgListTree/>
            },
            {
                title: 'Evaluate',
                path: '/piquetree',
                icon: <CgListTree/>
            },
            {
                title: 'Assess',
                path: '/piquetree',
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