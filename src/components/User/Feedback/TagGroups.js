import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

const SUM = (a,b) => a+b

const TagGroups = ({groups, tagCounts, tags, setTags, defaultExpand}) => { 
    const [ open, setOpen ] = useState(defaultExpand)
    const toggle = () => setOpen(!open)
    const collpaseIcon = open ? faMinusSquare : faPlusSquare
    const collpaseText = open ? 'Collapse All' : 'Expand All'
    const totalCount = Object.values(tagCounts).reduce(SUM, 0)
    const tagHintText = '( Hover over tag for description. )'
    const title = totalCount ? `Tags-${totalCount}` : `Tags`

    return (
        <div className=''>
            <div className='flex items-center justify-between text-sm'>
                <p className='font-bold'>{title}<span className='text-xs text-gray ml-2 hidden sm:inline-block'>{tagHintText}</span></p>
                <div className='cursor-pointer' onClick={toggle}><span>{collpaseText}</span><FontAwesomeIcon className='ml-2' icon={collpaseIcon} size='xs' /></div>
            </div>
            <div className='border-b-2 border-gray-border my-2' />
            { groups.map((group, index) => <TagGroup key={group.id} group={group} tagCounts={tagCounts} tags={tags} setTags={setTags} expanded={open} />)}
        </div>
    )
}

const TagGroup = ({expanded, group, tags, setTags, tagCounts}) => {
    const [ open, setOpen ] = useState(false)
    useEffect(()=> {
        setOpen(expanded)
    }, [expanded])
    const toggle = () => setOpen(!open)
    const groupZone = open ? 'block' : 'hidden'
    const collpaseIcon = open ? faMinusSquare : faPlusSquare
    const tagsSelected = group.tags.filter(tag => tags.map(t=> t.id).includes(tag.id)).length
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
                <TagSelect group={group} tags={tags} setTags={setTags} tagCounts={tagCounts} />
            </div>
        </div>
    )
}

const TagSelect = ({group, tags, setTags, tagCounts}) => {
    const toggleTag = (tag) => {
        const newTags = tags.map(t=> t.id).includes(tag.id) ? tags.filter(selected => selected.id !== tag.id) : [...tags, tag]
        setTags(newTags)
    }
    return (
        <ul className='flex flex-wrap my-2'>
            { group.tags.map((tag) => <FeedbackTag key={tag.name} tagCounts={tagCounts} tag={tag} selected={tags.map(t => t.id).includes(tag.id)} select={toggleTag} />) }
        </ul>
    )
}

const FeedbackTag = ({tag, selected, select, tagCounts}) => {
    const selectedStyle = selected ? 'border-2 border-blue-700' : 'border border-gray-border hover:border-blue-700'
    const selectedText = selected ? 'text-blue-700' : 'text-gray-dark hover:text-blue-700'
    const count = tagCounts[tag.name] || 0
    const title = count ? `${tag.name}-${count}` : tag.name

    return (
        <li title={tag.description} onClick={()=> select(tag)} className={`cursor-pointer py-1 px-5 mr-2 rounded-full flex items-center justify-center ${selectedStyle} my-1`}>
            <p className={`${selectedText} font-semibold text-2xs`}>
                { selected ? <span className='mr-2'><FontAwesomeIcon icon={faCheck} size='lg' /></span> : null }
                { title }
            </p>
        </li>
    )
}

export default TagGroups
