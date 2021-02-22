import React, {useState, useEffect, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

const TagContext = React.createContext({})
const SUM = (a,b) => a+b

const TagGroups = ({groups, tagCounts, tags, setTags}) => { 
    const [ open, setOpen ] = useState(false)
    const toggle = () => setOpen(!open)
    const collpaseIcon = open ? faMinusSquare : faPlusSquare
    const collpaseText = open ? 'Collapse All' : 'Expand All'
    const totalCount = Object.values(tagCounts).reduce(SUM, 0)
    const title = totalCount ? `Tags-${totalCount}` : 'Tags'

    return (
        <TagContext.Provider value={{groups, tagCounts, tags, setTags}}>
            <div className=''>
                <div className='flex items-center justify-between'>
                    <p className='font-bold'>{title}</p>
                    <div onClick={toggle}>{collpaseText}<FontAwesomeIcon className='ml-2' icon={collpaseIcon} size='xs' /></div>
                </div>
                <div className='border-b-2 border-gray-border my-2' />
                { groups.map((group, index) => <TagGroup key={group.id} group={group} expanded={open} />)}
            </div>
        </TagContext.Provider>
    )
}

const TagGroup = ({expanded, group}) => {
    const { tags, tagCounts } = useContext(TagContext)
    const [ open, setOpen ] = useState(false)
    useEffect(()=> {
        setOpen(expanded)
    }, [expanded])
    const toggle = () => setOpen(!open)
    const groupZone = open ? 'block' : 'hidden'
    const collpaseIcon = open ? faMinusSquare : faPlusSquare
    const tagsSelected = group.tags.filter(tag => tags.includes(tag)).length
    const selectedCount = Array(...new Set(group.tags.map(tag => tag.name))).map(name => tagCounts[name] || 0).reduce(SUM,0)
    const selectedStyle = tagsSelected ? 'text-blue-700 font-bold' : ''
    const title = selectedCount ? `${group.name}-${selectedCount}` : group.name 

    return (
        <div>
            <div className='flex items-center'>
                <p className={`mr-2 text-sm ${selectedStyle}`}>{title}</p>
                <div onClick={toggle}><FontAwesomeIcon icon={collpaseIcon} size='xs' /></div>
            </div>
            <div className={`${groupZone}`}>
                <TagSelect group={group} />
            </div>
        </div>
    )
}

const TagSelect = ({group}) => {
    const { tags, setTags } = useContext(TagContext)
    const toggleTag = (tag) => {
        const newTags = tags.includes(tag) ? tags.filter(selected => selected !== tag) : [...tags, tag]
        setTags(newTags)
    }

    return (
        <ul className='flex flex-wrap my-2'>
            { group.tags.map((tag) => <FeedbackTag key={tag.name} tag={tag} selected={tags.includes(tag)} select={toggleTag} />) }
        </ul>
    )
}

const FeedbackTag = ({tag, selected, select}) => {
    const { tagCounts } = useContext(TagContext)
    const selectedStyle = selected ? 'border-2 border-blue-700' : 'border border-gray-border hover:border-blue-700'
    const selectedText = selected ? 'text-blue-700' : 'text-gray-dark hover:text-blue-700'
    const count = tagCounts[tag.name] || 0
    const title = count ? `${tag.name.toUpperCase()}-${count}` : tag.name.toUpperCase()

    return (
        <li title={tag.title} onClick={()=> select(tag)} className={`cursor-pointer py-1 px-5 mr-2 rounded-full flex items-center justify-center ${selectedStyle} my-1`}>
            <p className={`${selectedText} font-semibold text-2xs`}>
                { selected ? <span className='mr-2'><FontAwesomeIcon icon={faCheck} size='lg' /></span> : null }
                { title }
            </p>
        </li>
    )
}

export default TagGroups
