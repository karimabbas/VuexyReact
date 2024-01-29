import {Button} from "reactstrap"
import {Edit2, Trash} from "react-feather"

export const ExtensionColumn = (deleteHandler, edit) => [
    {
        name: '#',
        selector: 'rowId',
        sortable: true,
        minWidth: '10px'
    },
    {
        name: 'الاسم',
        selector: 'name',
        sortable: true,
        minWidth: '170px'
    },
    {
        allowOverflow: true,
        cell: row => {
            return (
                <div className='d-flex'>
                    <Button.Ripple className='btn-icon rounded-circle'
                                   color='flat-success' onClick={() => edit(row)}>
                        <Edit2 className='headings' size={16}/>
                    </Button.Ripple>
                    <Button.Ripple className='btn-icon rounded-circle'
                                   color='flat-success'
                                   onClick={() => deleteHandler(row.id)}>
                        <Trash className='headings' size={16}/>
                    </Button.Ripple>
                </div>
            )
        }
    }

]
export const cityColumn = (deleteHandler, edit) => [
    {
        name: '#',
        selector: 'rowId',
        sortable: true,
        minWidth: '10px'
    },
    {
        name: 'الاسم',
        selector: 'name',
        sortable: true,
        minWidth: '170px'
    },
    {
        allowOverflow: true,
        cell: row => {
            return (
                <div className='d-flex'>
                    <Button.Ripple className='btn-icon rounded-circle'
                                   color='flat-success' onClick={() => edit(row, 'city')}>
                        <Edit2 className='headings' size={16}/>
                    </Button.Ripple>
                    <Button.Ripple className='btn-icon rounded-circle'
                                   color='flat-success'
                                   onClick={() => deleteHandler(row.id, 'city')}>
                        <Trash className='headings' size={16}/>
                    </Button.Ripple>
                </div>
            )
        }
    }

]
export const townColumn = (deleteHandler, edit) => [
    {
        name: '#',
        selector: 'rowId',
        sortable: true,
        minWidth: '10px'
    },
    {
        name: 'الاسم',
        selector: 'name',
        sortable: true,
        minWidth: '170px'
    },
    {
        allowOverflow: true,
        cell: row => {
            return (
                <div className='d-flex'>
                    <Button.Ripple className='btn-icon rounded-circle'
                                   color='flat-success' onClick={() => edit(row, 'town')}>
                        <Edit2 className='headings' size={16}/>
                    </Button.Ripple>
                    <Button.Ripple className='btn-icon rounded-circle'
                                   color='flat-success'
                                   onClick={() => deleteHandler(row.id, 'town')}>
                        <Trash className='headings' size={16}/>
                    </Button.Ripple>
                </div>
            )
        }
    }

]
export const regionColumn = (deleteHandler, edit) => [
    {
        name: '#',
        selector: 'rowId',
        sortable: true,
        minWidth: '10px'
    },
    {
        name: 'الاسم',
        selector: 'name',
        sortable: true,
        minWidth: '170px'
    },
    {
        allowOverflow: true,
        cell: row => {
            return (
                <div className='d-flex'>
                    <Button.Ripple className='btn-icon rounded-circle'
                                   color='flat-success' onClick={() => edit(row, 'region')}>
                        <Edit2 className='headings' size={16}/>
                    </Button.Ripple>
                    <Button.Ripple className='btn-icon rounded-circle'
                                   color='flat-success'
                                   onClick={() => deleteHandler(row.id, 'region')}>
                        <Trash className='headings' size={16}/>
                    </Button.Ripple>
                </div>
            )
        }
    }

]