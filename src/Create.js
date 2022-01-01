import {useState} from 'react';
import {useHistory} from 'react-router-dom'

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const Image =(e)=>{
        const file = e.target.files[0];
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        setIsPending(true);
    
        fetch('http://localhost:8000/blogs',{
            method:"POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(blog)
            
        }).then(()=>{
            console.log('new blog added');
            setIsPending(false);
            history.push('/')
        })
      }
    return (
        <div className='create'>
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                type='text' 
                required
                value={title}
                onChange={(e)=>setTitle(e.target.value)}/>
                <label>Blog body:</label>
                <textarea 
                required
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                ></textarea>
                <label>Blog Image:</label>

                <input
                    type="file"
                    accept="image/*"
                    required
                    // value = {image}
                    onChange={Image}
                />
                
                <label>Blog author:</label>
                <input 
                type="text" 
                value={author}
                onChange={(e)=>setAuthor(e.target.value)}
                />
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog</button>}

            </form>
            
        </div>
      );
}
 
export default Create;