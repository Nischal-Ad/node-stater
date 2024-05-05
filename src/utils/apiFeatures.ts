/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'

interface IReusableMongoose {
  mongooseQuery: any
  queryObject: any
  searchFields: string[]
}

const reusableMongoose = ({
  mongooseQuery,
  queryObject,
  searchFields,
}: IReusableMongoose) => {
  let clonedQueryObject = _.cloneDeep(queryObject)

  delete clonedQueryObject.pagination_limit
  delete clonedQueryObject.pagination_page
  delete clonedQueryObject.search
  delete clonedQueryObject.showCount
  delete clonedQueryObject.sort
  delete clonedQueryObject.no_pagination_limit

  // Appending all query strings to mongooseQuery

  clonedQueryObject = JSON.stringify(clonedQueryObject)
  const stringiFiedData = clonedQueryObject.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match: any) => {
      return `$${match}`
    }
  )
  clonedQueryObject = JSON.parse(stringiFiedData)
  mongooseQuery = mongooseQuery.find(clonedQueryObject)

  // Working with search
  if (queryObject.search) {
    const searchArray: any[] = []
    searchFields.map((el) =>
      searchArray.push({
        [el]: { $regex: new RegExp(queryObject.search, 'i') },
      })
    )
    mongooseQuery = mongooseQuery.find({ $or: searchArray })
  }

  let pagination_limit
  let pagination_page
  let no_pagination_limit

  //working on sort
  if (queryObject.sort) {
    const sortBy = queryObject.sort.split(',').join(' ')
    mongooseQuery = mongooseQuery.sort(sortBy)
  } else {
    mongooseQuery = mongooseQuery.sort('-createdAt')
  }

  // Working on limits
  if (
    !queryObject.no_pagination_limit ||
    queryObject.no_pagination_limit === 'false'
  ) {
    // Limiting too much data...
    queryObject.pagination_page ? queryObject.pagination_page : 1
    queryObject.pagination_limit ? queryObject.pagination_limit : 10

    if (
      queryObject.pagination_page < 1 ||
      queryObject.pagination_limit < 1 ||
      queryObject.pagination_limit > 100
    ) {
      throw new Error('Page and limit must be greater than 1 & less than 100')
    }

    mongooseQuery = mongooseQuery
      .skip(
        queryObject.pagination_page > 1
          ? (queryObject.pagination_page - 1) * queryObject.pagination_limit
          : 0
      )
      .limit(queryObject.pagination_limit)

    pagination_limit = parseInt(queryObject.pagination_limit ?? 10)
    pagination_page = parseInt(queryObject.pagination_page ?? 1)
    no_pagination_limit = 'false'
  } else {
    mongooseQuery
    pagination_limit = undefined
    pagination_page = undefined
    no_pagination_limit = 'true'
  }

  return {
    query: mongooseQuery,
    conditions: mongooseQuery._conditions,
    pagination_limit,
    pagination_page,
    no_pagination_limit,
  }
}

export default reusableMongoose
