import {AiOutlineDashboard} from 'react-icons/ai'
import {BsBarChart} from 'react-icons/bs'
import {AiOutlineSetting} from 'react-icons/ai'
import {RiProjectorLine} from 'react-icons/ri'
import {CgListTree} from 'react-icons/cg'
import {IoMdArrowDropdown} from 'react-icons/io';
import {IoMdArrowDropup} from 'react-icons/io'
import { BsGraphUp } from "react-icons/bs";
import React from 'react';

export const menuItemList = [
    {
        title: 'Dashboard',
        path:'/',
        icon: <AiOutlineDashboard/>
    },
  // Commenting out Visualize and its sub-items
  /*
  {
    title: 'Visualize',
    path:'/visualize',
    icon: <BsBarChart />,
    dropdownOpened: <IoMdArrowDropup />,
    dropdownClosed: <IoMdArrowDropdown />,
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
  */
  {
    // rename this page
    // title: 'Evaluate',
    title: 'Upload Projects',
    path: '/evaluate',
    icon: <BsGraphUp />

   },
// hide the not used pages
//   {
//     title: 'Projects',
//     path:'/projects',
//     icon: <RiProjectorLine/>
// },
// {
//     title: 'Settings',
//     path:'/settings',
//     icon: <AiOutlineSetting/>
// }
]