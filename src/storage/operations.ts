import { cryptoModel } from './index'
import ICryptoDoc from './models/cryptoDoc'

const getCourseData = async (currency: string): Promise<ICryptoDoc> => {
    try {
        const response = await cryptoModel.findOne({ currency })
        return response
    } catch (err) {
        console.log(err)
    }
    return await cryptoModel.find({ currency })
}

const saveCourse = async (currency: string, price: number, time: string) => {
    const course = { price, date: time, marketplace: 'bitstamp' }
    const response = await cryptoModel.find({ currency })
    
    if (response) {
        const currentData: ICryptoDoc = response[0]
        const previousCourses = currentData.courses
        previousCourses.push(course)
        const updateResponse = await cryptoModel.findOneAndUpdate({ currency }, { courses: previousCourses }, { useFindAndModify: false })
        if (updateResponse !== null) console.log(`Updated ${currency} course data.\n`)
    } else {
        await cryptoModel.create({currency, courses: [ course ]})
    }
}

export {
    getCourseData,
    saveCourse
}