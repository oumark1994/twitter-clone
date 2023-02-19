import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'
import Input from "../components/Input"
import Post from "../components/Post"
const Feed = () => {
    const posts = [
        {
            id:"1",
            name:"Oumark",
            username:"codewithOumark",
            userImg:"https://images.unsplash.com/photo-1676026273590-ac4b25e833af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80",
            img:"https://images.unsplash.com/photo-1676026273590-ac4b25e833af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80",
            text:"nice view!",
            timestamp:"2 hours ago"
        },
        {
            id:"2",
            name:"Laouna kolla",
            username:"codewithOumark",
            userImg:"https://images.unsplash.com/photo-1675514357485-bc56fb14707e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            img:"https://images.unsplash.com/photo-1675514357485-bc56fb14707e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            text:"Wow",
            timestamp:"2 days ago"
        }
    ]
  return (
    <div className="xl:ml-[370px] border-l border-gray-200 border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-lg ">
        <div className='flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
                <SparklesIcon className='h-5 '/>
            </div>
        </div>
        <Input/>
        {posts.map((post)=>(
            <Post key={post.id} post={post}/>
        ))}
    </div>
  )
}

export default Feed