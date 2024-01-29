import { AiOutlineFilePdf, AiOutlineFileWord } from 'react-icons/ai'
import { RiFileExcel2Line } from 'react-icons/ri'
import { MoreVertical, Edit, FileText, Archive, Trash, Image, Printer } from 'react-feather'

const checkImage = (extension) => {
    return extension.includes('image') ||
        extension.includes('png') ||
        extension.includes('jpg') ||
        extension.includes('jpeg')
}
export const renderFilePreview = file => {
    if (checkImage(file.extension)) {
        // return <img className='rounded' alt={ 'file' } src={ `${Url.BASE_URL}${file.url}` } height='28' width='28' />
        return <img width='35px' src="https://t.palexpand.ps/assets/images/ico/image.png" style={{ width: '25px' }}  />

    } else if (file.extension.includes('pdf')) {
        return <img width='35px' src="https://t.palexpand.ps/assets/images/ico/pdf.png" style={{ width: '25px' }}/>
    } else if (file.extension.includes('doc')) {
        return <img width='35px' src="https://template.expand.ps/public/assets/images/ico/word.png" style={{ width: '25px' }}/>
        // return <AiOutlineFileWord size='28' />
    } else if (file.extension.includes('xls')) {
        return <img width='35px' src="https://template.expand.ps/public/assets/images/ico/excel.png" style={{ width: '25px' }}/>
        // return <RiFileExcel2Line size='28' />
    } else {
        return <FileText size='30' />
    }
}